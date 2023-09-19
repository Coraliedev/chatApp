const User = require("../models/user.model");
const FriendRequest = require("../models/friendRequest.model");


function handleFriendEvents(io, socket) {

  socket.on("friend_request", async (data) => {
    try {
      const to = await User.findById(data.to).select("socket_id");
      const from = await User.findById(data.from).select("socket_id");

      // create friend request
      await FriendRequest.create({
        sender: data.from,
        receiver: data.to,
      });
      // emit friend request
      io.to(to.socket_id).emit("new_friend_request", {
        message: "New friend request received !",
      });
      io.to(from.socket_id).emit("request_sent", {
        message: "Friend request sent successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  })
  
}

module.exports = { handleFriendEvents };