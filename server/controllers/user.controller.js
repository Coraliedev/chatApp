'use strict'

const User = require('../models/user.model')
const FriendRequest = require('../models/friendRequest.model')

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

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const userFriends = user.friends;

    // exclude the current user and the friends of the current user
    const users = await User.find({
      _id: { $ne: req.userId, $nin: userFriends }
    }).select('-password');

    res.status(200).json({
      status: 'success',
      data: users
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

module.exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('friends', '-password');

    res.status(200).json({
      status: 'success',
      data: user.friends,
      message: 'Friends retrieved successfully'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

module.exports.getFriendRequests = async (req, res) => {
  try {
    const requests = await FriendRequest.find({ receiver: req.userId })
    .populate("sender")
    .select("_id firstName lastName");

  res.status(200).json({
    status: "success",
    data: requests,
    message: "Requests found successfully!",
  });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}




