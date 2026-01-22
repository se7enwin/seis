/**
 * Post routes.
*/

'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/postController')
const checkAuth = require('../middleware/checkAuth')
const loginLimiter = require('../middleware/loginLimiter');
const loginDelay = require('../middleware/loginDelay')



// Publicas 

router.post('/register', controller.createUser)
router.post('/login', loginLimiter, loginDelay, controller.loginUser);

// Confirmacion

router.get('/confirm/:token', controller.confirmUser);
router.post('/resend-confirmation', controller.resendConfirmation);


// Password

router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password/:token", controller.resetPassword);


// Privadas

router.get('/profile', checkAuth, controller.getProfile);
router.get('/fav', checkAuth, controller.getFav)
router.post('/fav', checkAuth, controller.createFav)
router.post("/delfav", checkAuth, controller.destroyFav)
router.get('/posts', checkAuth, controller.getAll)
router.post('/posts', checkAuth, controller.create)
router.get('/character/:id', checkAuth, controller.getCharById);





//router.post('/author', controller.createAuthor)
//router.post('/book', controller.createBook)
//router.delete("/fav/:id", controller.destroyFav)


module.exports = router