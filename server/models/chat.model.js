'use strict'

const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  participants : [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  messages : [
    {
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      from : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      type : {
        type: String,
        enum: ['Text', 'Media', 'Document', "Link"]
      },
      created_at : {
        type: Date,
        default: Date.now()
      },
      text: {
        type: String
      },
      file : {
        type : String 
      }
    }
  ]
})

const Chat = mongoose.model('OneToOneMessage', chatSchema)
module.exports = Chat