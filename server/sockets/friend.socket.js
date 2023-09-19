'use strict'

const User = require('../models/user.model')
const FriendRequest = require('../models/friendRequest.model')

function handleFriendEvents(io, socket) {
  socket.on('friend_request', async (data) => {
    try {
      const to = await User.findById(data.to).select('socket_id')
      const from = await User.findById(data.from).select('socket_id')

      // create friend request
      await FriendRequest.create({
        sender: data.from,
        receiver: data.to
      })
      // emit friend request
      io.to(to.socket_id).emit('new_friend_request', {
        message: 'New friend request received !'
      })
      io.to(from.socket_id).emit('request_sent', {
        message: 'Friend request sent successfully!'
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('accept_friend_request', async (data) => {
    try {
      const request_doc = await FriendRequest.findById(data.request_id)

      const sender = await User.findById(request_doc.sender)
      const receiver = await User.findById(request_doc.receiver)

      // add friend to user
      sender.push('friends', request_doc.receiver)
      receiver.push('friends', request_doc.sender)

      await receiver.save({ new: true, validateModifiedOnly: true })
      await sender.save({ new: true, validateModifiedOnly: true })

      // delete friend request
      await FriendRequest.findByIdAndDelete(data.request_id)

      // emit friend request accepted
      io.to(sender.socket_id).emit('request_accepted', {
        message: 'Friend Request Accepted'
      })
      io.to(receiver.socket_id).emit('request_accepted', {
        message: 'Friend Request Accepted'
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('reject_friend_request', async (data) => {
    try {
      const request_doc = await FriendRequest.findById(data.request_id)

      const sender = await User.findById(request_doc.sender)

      // delete friend request
      await FriendRequest.findByIdAndDelete(data.request_id)

      // emit friend request rejected
      io.to(sender.socket_id).emit('request_rejected', {
        message: 'Friend Request Rejected'
      })
    } catch (error) {
      console.log(error)
    }
  })
}

module.exports = { handleFriendEvents }
