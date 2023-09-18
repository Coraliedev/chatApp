'use strict'

const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Both email and password are required'
    })
  }

  // Check if user exists
  const user = await User.findOne({ email: email }).select('+password')

  if (!user) {
    return res.status(400).json({
      status: 'error',
      message: 'Email not found'
    })
  }

  // Check if password is valid
  const isPasswordValid = await user.checkPassword(password)

  if (!isPasswordValid) {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid password'
    })
  }

  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

  res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    token
  })
}

module.exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  // check if a user with the same email exists
  const existingUser = await User.findOne({ email: email })

  if (existingUser) {
    return res.status(400).json({
      status: 'error',
      message: 'Email already exists, Please login'
    })
  }

  // create a new user
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password
    })
    // create token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: newUser,
      token
    })
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    })
  }
}
