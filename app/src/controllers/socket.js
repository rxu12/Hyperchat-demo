const { recognizeUserConnection, saveMessage, fetchMessageLog } = require('../services/socket');

const SocketController = (socket, onlineUsers, context) => {
  
  const handleUserJoin = async () => {
    const { email } = await recognizeUserConnection(socket.decoded_token.sub);
    socket.id = email;
    console.log('User Entered: ', email, context.sockets.sockets);
    onlineUsers.push(email);
    socket.emit('registered', email);
    socket.broadcast.emit('new user joined', onlineUsers);
    const log = await fetchMessageLog();
    socket.emit('update message log', log.reverse());
  };

  const handleNewMessage = async (message) => {
    console.log('New Message from ', socket.id);
    const messageObj = await saveMessage(socket.id, message, Date.now());
    if (messageObj) {
      socket.broadcast.emit('new message', messageObj);
    }
  };

  return {
    handleUserJoin,
    handleNewMessage
  };
};

module.exports = SocketController;
