export const handleEnter = text => ({ draft: text });

export const sendMessage = () => (state) => {
  state.socket.emit("new message", state.draft);
  return { draft: "" };
};

export const updateMessageLog = newMessageLog => {
  return {
    messageLog: newMessageLog
  };
};

export const pushToMessageLog = newMessage => ({ messageLog }) => ({
  messageLog: [...messageLog, newMessage]
});
