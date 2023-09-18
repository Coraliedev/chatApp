'use strict'

const router = require('express').Router()
const userController = require('../controllers/user.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', verifyToken, userController.getUserInfo)

module.exports = router