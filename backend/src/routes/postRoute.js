'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/postController')
const checkAuth = require('../middleware/checkAuth')
const loginLimiter = require('../middleware/loginLimiter')
const loginDelay = require('../middleware/loginDelay')

/* =========================
   PUBLIC ROUTES
========================= */

// Auth
router.post('/register', controller.createUser)
router.post('/login', loginLimiter, loginDelay, controller.loginUser)

// Characters
router.get('/character/:id', controller.getCharById)
router.get('/character/:id/image', controller.getImage)

// Account confirmation
router.get('/confirm/:token', controller.confirmUser)
router.post('/resend-confirmation', controller.resendConfirmation)

// Password recovery
router.post('/forgot-password', controller.forgotPassword)
router.post('/reset-password/:token', controller.resetPassword)

/* =========================
   PRIVATE ROUTES (JWT)
========================= */

// User
router.get('/profile', checkAuth, controller.getProfile)

// Favorites
router.get('/fav', checkAuth, controller.getFav)
//router.get('/fav', (req, res) => {res.status(200).json({ ok: true });});
//router.get('/fav', controller.getFav)

router.post('/fav', checkAuth, controller.createFav)
//router.post('/fav', controller.createFav)

router.post('/delfav', checkAuth, controller.destroyFav)

// Posts (si siguen en uso)
router.get('/posts', checkAuth, controller.getAll)
router.post('/posts', checkAuth, controller.create)

module.exports = router
