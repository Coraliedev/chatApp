'use strict'

const router = require('express').Router()

const authController = require('../controllers/auth.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/logout', verifyToken, authController.logout);

module.exports = router
