/**
 * Post Service
 */

'use strict'

const db = require('../bd/config/postgresql')
const models = require("../bd/models")
const axios = require('axios');
//const URL = 'https://rickandmortyapi.com/api/character/';
const URL = 'https://corsproxy.io/?https://hp-api.onrender.com/api/character/';

const postService = {}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const emailRegistro = require("../helpers/emailRegistro");
const emailResetPassword = require("../helpers/emailResetPassword");

/**
 * Get all posts
 */

console.log("JWT typeof:", typeof jwt);
console.log("JWT keys:", Object.keys(jwt));


postService.getAll = async () => {
    return models.Post.findAndCountAll({
        order: [
            ['id', 'ASC'],
        ],
    })
}

postService.create = async (req, res) => {
    const title = req.body?.title;
    const message = req.body?.message;
    const likes = req.body?.likes;
    if (!title || !message || !likes) {

        throw new Error("Datos inválidos");
        ;
    }

    return models.Post.create({
        title, message, likes
    })

}
postService.getCharById = async (req, res) => {

    try {
        const { id } = req.params;

        const { data } = await axios(URL + id)
        const character = {

            id: data.id,
            name: data.name,
            house: data.house,
            wand: data.wand,
            ancestry: data.ancestry,
            image: data.image


        }


        if (!character.name) {
            throw new Error("Datos inválidos");
        } else { return character }


    } catch (error) {
        return error


    }

}

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

    const tokenExpires = new Date();
    tokenExpires.setHours(tokenExpires.getHours() + 24);

    const user = await models.User.create({
        email,
        password: hashedPassword,
        age,
        confirmed: false,
        token,
        tokenExpires: new Date(Date.now() + 1000 * 60 * 60 * 24) // 24h
    });

    await emailRegistro({
        email: user.email,
        token: user.token
    });

    return {
        msg: "Usuario creado. Revisa tu email para confirmar la cuenta."
    };
};
// postService.loginUser = async (req, res) => {
//     const email = req.query?.email;
//     const password = req.query?.password;
//     if (!email || !password) {

//         throw error;
//     }
//     console.log('Email: ', email, "Password: ", password)
//     //

//     const user = await models.User.findOne({ where: { email: email } });
//     console.log('Prueba Contenedor - Se obtiene user con sequelize? :', user)
//     if (!user) { throw error }
//     //return res.status(404).send("Usuario no encontrado");
//     const id = user.id;
//     if (user.password !== password) { throw error } else { return { access: true, userId: id } } //prueba

// }

postService.loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error('Email y password obligatorios');
    }

    const user = await models.User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Credenciales inválidas');
    }
    if (!user.confirmed) {
        throw new Error('Debes confirmar tu cuenta por email');
    }

    console.log("JWT typeof:", typeof jwt);
    console.log("JWT keys:", Object.keys(jwt));
    console.log("LOGIN BODY:", req.body);

    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
        token,
        user: {
            id: user.id,
            email: user.email
        }
    };
};


postService.getFav = async (req, res) => {
    const userId = req.user.id; // ✅ viene del JWT

    console.log('GetFavorites → userId:', userId);

    return await models.Favorite.findAll({
        where: { userId }
    });
};


postService.createFav = async (req, res) => {
    const name = req.body?.name;
    const image = req.body?.image;
    const house = req.body?.house;
    const wand = req.body?.wand;
    const ancestry = req.body?.ancestry;
    const id = req.body?.id;
    const userId = req.body?.userId;

    console.log('id: ', id, '\nNombre: ', name, '\nHouse:', house, '\nWand: ', wand, '\nUserId: ', userId)
    if (!name || !image || !house || !wand || !id || !ancestry || !userId) {
        console.log('name: ', name, "id: ", id)

        throw new Error("Datos inválidos");

    }
    await models.Favorite.findOrCreate({
        where: { name: name, image: image, house: house, wand: wand, ancestry: ancestry, id: id, userId: userId },
    })
    const result = models.Favorite.findAll({ where: { userId: userId } });



    return result; // Ver si no funciona de agregar variable y retornar

}
postService.destroyFav = async (req, res) => {
    const { id } = req.body;
    const userId = req.user.id; // ✅

    await models.Favorite.destroy({
        where: { id, userId }
    });

    return await models.Favorite.findAll({ where: { userId } });
};

const { Op } = require("sequelize");

postService.confirmUser = async (req) => {
    const { token } = req.params;

    const user = await models.User.findOne({
        where: { token }
    });

    if (!user) {
        throw new Error("Token inválido");
    }

    if (user.tokenExpires < new Date()) {
        throw new Error("Token expirado");
    }

    user.confirmed = true;
    user.token = null;
    user.tokenExpires = null;

    await user.save();

    return { msg: "Cuenta confirmada correctamente" };
};

postService.resendConfirmation = async (req) => {
    const { email } = req.body;

    if (!email) {
        throw new Error("El email es obligatorio");
    }

    const user = await models.User.findOne({ where: { email } });

    // Seguridad: no revelar existencia
    if (!user || user.confirmed) {
        return { msg: "Si la cuenta existe, recibirás un email" };
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.token = token;
    user.tokenExpires = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await user.save();

    await emailRegistro({
        email: user.email,
        token
    });

    return { msg: "Si la cuenta existe, recibirás un email" };
};



postService.forgotPassword = async (req) => {
    const { email } = req.body;
    console.log("👉 forgotPassword SERVICE");


    if (!email) {
        throw new Error("El email es obligatorio");
    }

    const user = await models.User.findOne({ where: { email } });

    // Respuesta neutra (seguridad)
    if (!user) {
        return { msg: "Si el email existe, recibirás instrucciones" };
    }

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

    if (!password) {
        throw new Error("La contraseña es obligatoria");
    }

    const user = await models.User.findOne({ where: { token } });

    if (!user) {
        throw new Error("Token inválido");
    }

    if (user.tokenExpires < new Date()) {
        throw new Error("Token expirado");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.token = null;
    user.tokenExpires = null;

    await user.save();

    return { msg: "Contraseña actualizada correctamente" };
};


// postService.verifyResetToken = async (req) => {
//     const { token } = req.params;

//     const user = await User.findOne({ where: { token } });

//     if (!user) {
//         throw new Error("Token inválido");
//     }

//     if (user.tokenExpires < new Date()) {
//         throw new Error("Token expirado");
//     }

//     return { ok: true };
// };



postService.createAuthor = async (req, res) => {
    const name = req.body?.name;
    const age = req.body?.age;
    if (!name || !age) {

        throw new Error("Datos inválidos");
        ;
    }

    return models.Author.create({
        name, age
    })

}

postService.createBook = async (req, res) => {
    const isbn = req.body?.isbn;
    const name = req.body?.name;
    const cantPages = req.body?.cantPages;
    const authorId = req.body?.authorId;

    console.log('isbn: ', isbn, ' name: ', name, ' cantPages: ', cantPages)
    if (!isbn || !name || !cantPages || !authorId) {

        throw new Error("Datos inválidos");
        ;
    }

    return models.Book.create({
        isbn, name, cantPages, authorId
    })

}

module.exports = postService