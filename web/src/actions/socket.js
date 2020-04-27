import SocketIO from "socket.io-client";

const connect = () => (state, actions) => {
  const socket = SocketIO.connect('/', {
    query: `token=${sessionStorage.getItem("token")}`
  });
  /**
    Observes all incoming server-side events,
    and update store accordingly
  */
  socket
    .on("connect", () => {
      console.log("Socket Connected.");
      actions.setSocket(socket);
      socket.emit("enter chat");
    })
    .on("registered", username => {
      actions.setUsername(username);
    })
    .on("update message log", messageLog => {
      actions.chat.updateMessageLog(messageLog);
    })
    .on("new user joined", userList => {
      actions.updateUserList(userList);
    })
    .on("user left", userList => {
      actions.updateUserList(userList);
    })
    .on("new message", newMessage => {
      actions.chat.pushToMessageLog(newMessage);
    })
    .on("disconnect", () => {
      console.log("Socket Disconnected.");
    });
};

const setSocket = socket => (state, actions) => ({
  chat: { ...state.chat, socket }
});

const updateUserList = newList => (state, actions) => ({
  chat: { ...state.chat, userList: newList }
});

export { connect, setSocket, updateUserList };
