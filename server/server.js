'use strict'

const app = require('./app')

process.on('uncaughtException', (err) => {
  console.log(err)
  process.exit(1)
})

require('dotenv').config()

const http = require('http')
const mongoose = require('mongoose')
const { Server } = require('socket.io')
const User = require('./models/user.model')
const friendModule = require('./sockets/friend.socket')

const server = http.createServer(app)

// configure socket.io
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

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

// Listen for when the client connects via socket.io-client
io.on('connection', async (socket) => {
  console.log(JSON.stringify(socket.handshake.query))
  const user_id = socket.handshake.query['user_id']

  console.log(`User connected ${socket.id}`)

  if (user_id != null && Boolean(user_id)) {
    try {
      User.findByIdAndUpdate(user_id, {
        socket_id: socket.id,
        status: 'Online'
      }).then(() => {
        console.log(`User ${user_id} connected`);
        
      })
    } catch (e) {
      console.log(e)
    }
  }

  friendModule.handleFriendEvents(io, socket);

  socket.on("disconnect", async () => {
    // retrieve the user id of the disconnected user
    const user_id = socket.handshake.query['user_id'];
  
    // update the user status
    if (user_id) {
      try {
        await User.findByIdAndUpdate(user_id, { status: "Offline" });
        console.log(`User ${user_id} disconnected`);
      } catch (e) {
        console.log(e);
      }
    }
  });
})





process.on('unhandledRejection', (err) => {
  console.log(err)
  server.close(() => {
    process.exit(1)
  })
})
