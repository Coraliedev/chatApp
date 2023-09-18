const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

module.exports.verifyToken = async (req, res, next) => {
  // get token from request cookies
  const token = req.cookies.jwt

  if (!token) {
    return res.status(401).json({
      status: 'error',
      message: 'Unauthorized'
    })
  }

  // verify token
  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid token'
      })
    }

    // check if user still exists
    const user = await User.findById(decodedToken.id)

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User not found'
      })
    }

    // stock user id in request object
    req.userId = user._id
    next()
  })
}
