'use strict'

const express = require('express')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongosanitize = require('express-mongo-sanitize')
const morgan = require('morgan')
const xss = require('xss-clean')
const cors = require('cors')

const app = express()

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

app.use(helmet())
app.use(morgan('dev'))

const limited = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
})

app.use(limited)

app.use(mongosanitize())
app.use(xss())

app.use(
  cors({
    origin: '*',
    methods: 'GET,PUT,POST,DELETE',
    credentials: true
  })
)

module.exports = app
