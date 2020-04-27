const SocketIO = require("socket.io");
const socketioJwt = require("socketio-jwt");
const config = require("../config");
const SocketController = require("../controllers/socket");

module.exports = function(server) {
  const socketIO = SocketIO(server);
  // TODO need hoist and manage this state in a separately hosted service to allow scaling
  let onlineUsers = [];

  socketIO.use(
    socketioJwt.authorize({
      secret: config.secret,
      handshake: true
    })
  );

  socketIO.on("connection", socket => {
    const controller = SocketController(socket, onlineUsers, socketIO);
    socket.on("enter chat", controller.handleUserJoin);
    socket.on("new message", controller.handleNewMessage);
    socket.on("disconnect",   () => {
      console.log('User disconnected: ', socket.id);
      onlineUsers = onlineUsers.filter((id) => id !== socket.id);
      socket.broadcast.emit('user left', onlineUsers);
      console.log('Remaining Users: ', onlineUsers);
    });
  });
};
