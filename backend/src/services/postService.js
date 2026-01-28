/**
 * Post Service
 */

'use strict'

const models = require("../bd/models");
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const emailRegistro = require("../helpers/emailRegistro");
const emailResetPassword = require("../helpers/emailResetPassword");

const URL = 'https://corsproxy.io/?https://hp-api.onrender.com/api/character/';

const postService = {};

/* =====================================================
   POSTS
===================================================== */

postService.getAll = async () => {
    return models.Post.findAndCountAll({
        order: [['id', 'ASC']]
    });
};

postService.create = async (req) => {
    const { title, message, likes } = req.body;

    if (!title || !message || likes === undefined) {
        throw new Error("Datos inválidos");
    }

    return models.Post.create({ title, message, likes });
};

/* =====================================================
   AUTH
===================================================== */

postService.createUser = async (req) => {
    const { email, password, age } = req.body;

    if (!email || !password || !age) {
        throw new Error('Datos obligatorios');
    }

    const userExist = await models.User.findOne({ where: { email } });
    if (userExist) {
        throw new Error('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = crypto.randomBytes(20).toString("hex");

    const user = await models.User.create({
        email,
        password: hashedPassword,
        age,
        confirmed: false,
        token,
        tokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    await emailRegistro({ email: user.email, token });

    return { msg: "Usuario creado. Revisa tu email para confirmar la cuenta." };
};

postService.loginUser = async (req) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error('Email y password obligatorios');
    }

    const user = await models.User.findOne({ where: { email } });
    if (!user) throw new Error('Usuario no encontrado');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Credenciales inválidas');
    if (!user.confirmed) throw new Error('Debes confirmar tu cuenta por email');

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
        token,
        user: { id: user.id, email: user.email }
    };
};

/* =====================================================
   FAVORITES ✅ (CLAVE)
===================================================== */

// postService.getFav = async (req) => {
//     const userId = req.user?.id || req.body?.userId || req.query?.userId;

//     if (!userId) {
//         throw new Error('userId not provided');
//     }

//     return models.FavoriteDb.findAll({
//         where: { userId },
//         include: models.Character
//     });
// };
postService.getFav = async (req) => {
    const userId = req.user.id;

    return models.FavoriteDb.findAll({
        where: { userId },
        include: {
            model: models.Characters,
            required: true
        }
    });

};


postService.createFav = async (req) => {
    const { characterId } = req.body;
    const userId = req.user.id;

    if (!characterId) {
        throw new Error("characterId requerido");
    }

    await models.FavoriteDb.findOrCreate({
        where: { userId, characterId }
    });

    return models.FavoriteDb.findAll({ where: { userId } });
};

// postService.destroyFav = async (req) => {
//     const { characterId } = req.body;
//     const userId = req.user.id;

//     await models.FavoriteDb.destroy({
//         where: { userId, characterId }
//     });

//     return models.FavoriteDb.findAll({ where: { userId } });
// };

postService.destroyFav = async (req) => {
    const { characterId } = req.body;
    const userId = req.user.id;

    await models.FavoriteDb.destroy({
        where: { userId, characterId }
    });

    return models.Characters.findAll({
        include: [{
            model: models.FavoriteDb,
            where: { userId },
            attributes: []
        }]
    });
}


/* =====================================================
   CONFIRM / PASSWORD
===================================================== */

postService.confirmUser = async (req) => {
    const { token } = req.params;

    const user = await models.User.findOne({ where: { token } });
    if (!user) throw new Error("Token inválido");
    if (user.tokenExpires < new Date()) throw new Error("Token expirado");

    user.confirmed = true;
    user.token = null;
    user.tokenExpires = null;
    await user.save();

    return { msg: "Cuenta confirmada correctamente" };
};

postService.resendConfirmation = async (req) => {
    const { email } = req.body;

    const user = await models.User.findOne({ where: { email } });
    if (!user || user.confirmed) {
        return { msg: "Si la cuenta existe, recibirás un email" };
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.token = token;
    user.tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    await emailRegistro({ email: user.email, token });
    return { msg: "Si la cuenta existe, recibirás un email" };
};

postService.forgotPassword = async (req) => {
    const { email } = req.body;

    const user = await models.User.findOne({ where: { email } });
    if (!user) return { msg: "Si el email existe, recibirás instrucciones" };

    user.token = crypto.randomBytes(20).toString("hex");
    user.tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    await emailResetPassword({
        email: user.email,
        nombre: user.email,
        token: user.token
    });

    return { msg: "Te enviamos un email con instrucciones" };
};

postService.resetPassword = async (req) => {
    const { token } = req.params;
    const { password } = req.body;

    const user = await models.User.findOne({ where: { token } });
    if (!user) throw new Error("Token inválido");
    if (user.tokenExpires < new Date()) throw new Error("Token expirado");

    user.password = await bcrypt.hash(password, 10);
    user.token = null;
    user.tokenExpires = null;
    await user.save();

    return { msg: "Contraseña actualizada correctamente" };
};

/* =====================================================
   CHARACTERS
===================================================== */

postService.getCharById = async (id) => {
    const character = await models.Characters.findByPk(id, {
        attributes: { exclude: ['image'] }
    });

    if (!character) throw new Error('Not found');
    return character;
};

postService.getImage = async (id) => {
    const character = await models.Characters.findByPk(id);
    if (!character || !character.image) {
        throw new Error('Image not found');
    }

    if (Buffer.isBuffer(character.image)) return character.image;
    if (character.image?.data) return Buffer.from(character.image.data);

    throw new Error('Invalid image format');
};

module.exports = postService;
