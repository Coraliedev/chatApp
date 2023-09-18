const jwt = require('jsonwebtoken')

const User = require('../models/user.model')

module.exports.login = async (req, res) => {
  const { email, password } = req.body
  if(!email || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Both email and password are required'
    })
  }

  const user = await User.findOne({ email }).select('+password')

 if(!user) {
    return res.status(400).json({
      status: 'error',
      message: 'Email not found'
    })
 }

 const isPasswordValid = await user.checkPassword(password)

  if(!isPasswordValid) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid password'
      })
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

 res.status(200).json({
    status: 'success',
    message: 'User logged in successfully',
    token
  })

}
