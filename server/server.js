'use strict'

const app = require('./app')

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

require('dotenv').config()

const http = require('http')
const mongoose = require('mongoose')

const server = http.createServer(app)

const port = process.env.PORT || 8000
const db = process.env.MONGO_URL

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err))

server.listen(port, () => {
  console.log(`App running on port ${port}`)
})

process.on('unhandledRejection', (err) => {
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})
