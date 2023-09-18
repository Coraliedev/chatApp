'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required']
  },
  about: {
    type: String
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Online', 'Offline'],
    default: 'Offline'
  },
  socket_id: {
    type: String
  }
})

// check if password matches the one in the database
userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// hash password before saving to database
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User
