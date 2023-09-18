'use strict'

const router = require('express').Router()

const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')

router.use('/users', userRoutes)
router.use('/auth', authRoutes)

module.exports = router
