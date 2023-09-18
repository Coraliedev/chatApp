'use strict'

const User = require('../models/user.model')

module.exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.userId
    const user = await User.findById(userId).select('-password')

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      })
    }

    res.status(200).json({
      status: 'success',
      data: user
    })
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    })
  }
}