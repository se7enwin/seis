/**
 * Post routes.
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/postController')

router.get('/character/:id', controller.getCharById);
router.get('/posts', controller.getAll)
router.post('/posts', controller.create)
router.post('/login', controller.createUser)
router.get('/login', controller.loginUser)
router.get('/fav', controller.getFav)
router.post('/fav', controller.createFav)
router.post('/author', controller.createAuthor)
router.post('/book', controller.createBook)
//router.delete("/fav/:id", controller.destroyFav)
router.post("/delfav", controller.destroyFav)


module.exports = router