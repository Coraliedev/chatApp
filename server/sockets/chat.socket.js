'use strict'

const Chat = require('../models/chat.model')

function handleFriendEvents(io, socket) {
  socket.on('get_direct_conversations', async ({ user_id }, callback) => {
    try {
      const existing_conversations = await Chat.find({
        participants: { $all: [user_id] }
      }).populate('participants')

      callback(existing_conversations)
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('start_conversation', async (data) => {
    try {
      const { to, from } = data

      // check if there is any existing conversation
      const existing_conversations = await Chat.find({
        participants: { $size: 2, $all: [to, from] }
      }).populate('participants')

      // if no => create a chat doc & send it as payload
      if (existing_conversations.length === 0) {
        let new_chat = await Chat.create({
          participants: [to, from]
        })

        new_chat = await Chat.findById(new_chat).populate('participants')

        socket.emit('start_chat', new_chat)
      }
      // if yes => just emit event "start_chat" & send chat details as payload
      else {
        socket.emit('start_chat', existing_conversations[0])
      }
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("get_messages", async (data, callback) => {
    try {
      const { messages } = await Chat.findById(
        data.conversation_id
      ).select("messages");
      callback(messages);
    } catch (error) {
      console.log(error);
    }
  });
}

module.exports = { handleFriendEvents }
