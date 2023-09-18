'use strict'

const jwt = require('jsonwebtoken')
require('dotenv').config('')

const User = require('../models/user.model')

const maxAge = 3 * 24 * 60 * 60 * 1000

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  })
}

module.exports.login = async (req, res) => {
  const { email, password } = req.body
  try {
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
    const token = createToken(user._id)
  
    // send token in a HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge
    })
  
    res.status(200).json({
      status: 'success',
      message: 'User logged in successfully',
      token
    })
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
    
  }
 
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
    const token = createToken(newUser._id)

    // send token in a HTTP-only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge
    })

    res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      data: newUser,
      token
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}

module.exports.logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json({
      status: 'success',
      message: 'User logged out successfully'
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    })
  }
}
