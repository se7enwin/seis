/**
 * Post Service
 */

'use strict'

const db = require('../bd/config/postgresql')
const models = require("../bd/models")
const axios = require('axios');
const URL = 'https://rickandmortyapi.com/api/character/';

const postService = {}

/**
 * Get all posts
 */
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

        throw error;
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
            gender: data.gender,
            species: data.species,
            origin: data.origin?.name,
            image: data.image,
            status: data.status,

        }


        if (!character.name) { throw error } else { return character }


    } catch (error) {
        return error


    }

}

postService.createUser = async (req, res) => {
    const email = req.body?.email;
    const password = req.body?.password;
    const age = req.body?.age;
    if (!email || !password || !age) {
        throw new Error('Email, password y age son obligatorios');
    }

    console.log('Email: ', email, "Password: ", password, "Edad: ", age)

    return models.User.create({
        email, password, age
    })

}

postService.loginUser = async (req, res) => {
    const email = req.query?.email;
    const password = req.query?.password;
    if (!email || !password) {

        throw error;
    }
    console.log('Email: ', email, "Password: ", password)
    //

    const user = await models.User.findOne({ where: { email: email } });
    console.log('Prueba Contenedor - Se obtiene user con sequelize? :', user)
    if (!user) { throw error }
    //return res.status(404).send("Usuario no encontrado");
    const id = user.id;
    if (user.password !== password) { throw error } else { return { access: true, userId: id } } //prueba

}


postService.getFav = async (req, res) => {

    const userId = req.query.userLogin;
    console.log('Se ejecutó GetFavorites. El id de Usuario es: ', userId)
    const result = models.Favorite.findAll({ where: { userId: userId } });
    return result;

}

postService.createFav = async (req, res) => {
    const name = req.body?.name;
    const image = req.body?.image;
    const species = req.body?.species;
    const gender = req.body?.gender;
    const id = req.body?.id;
    const userId = req.body?.userId;

    console.log('id: ', id, '\nNombre: ', name, '\nEspecie:', species, '\nGenero: ', gender, '\nUserId: ', userId)
    if (!name || !image || !species || !gender || !id || !userId) {
        console.log('name: ', name, "id: ", id)

        throw error;
    }
    await models.Favorite.findOrCreate({
        where: { name: name, image: image, species: species, gender: gender, id: id, userId: userId },
    })
    const result = models.Favorite.findAll({ where: { userId: userId } });



    return result; // Ver si no funciona de agregar variable y retornar

}
postService.destroyFav = async (req, res) => {


    const { id } = req.body;
    const { userId } = req.body;
    console.log("El id del fav a eliminar es: ", id, ' el usuario es: ', userId);
    await models.Favorite.destroy({ where: { id, userId } });

    const myFavorites = await models.Favorite.findAll({ where: { userId: userId } });
    if (!myFavorites) { throw error } else { return myFavorites }

}

postService.createAuthor = async (req, res) => {
    const name = req.body?.name;
    const age = req.body?.age;
    if (!name || !age) {

        throw error;
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

        throw error;
    }

    return models.Book.create({
        isbn, name, cantPages, authorId
    })

}

module.exports = postService