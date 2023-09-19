'use strict'

const Chat = require('../models/chat.model')

function handleFriendEvents(io, socket) {
  socket.on("get_direct_conversations", async ({ user_id }, callback) => {
    
    const existing_conversations = await Chat.find({
      participants: { $all: [user_id] },
    }).populate("participants");

    callback(existing_conversations);
  });

}

module.exports = { handleFriendEvents }