const login = {
  email: "",
  password: ""
};

const signup = {
  email: "",
  password: ""
};

const appStatus = {
  authenticated: false,
  username: ""
};

const chat = {
  socket: null,
  draft: "",
  userList: [],
  messageLog: []
};

const state = {
  login,
  signup,
  appStatus,
  chat
};

export default state;
