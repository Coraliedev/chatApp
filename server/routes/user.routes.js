'use strict'

const router = require('express').Router()
const userController = require('../controllers/user.controller')
const { verifyToken } = require('../middleware/auth.middleware')

router.get('/', verifyToken, userController.getUserInfo)
router.get('/users', verifyToken, userController.getUsers)
router.get('/friends', verifyToken, userController.getFriends)
router.get('/friend-requests', verifyToken, userController.getFriendRequests)

module.exports = router