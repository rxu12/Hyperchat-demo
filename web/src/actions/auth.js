import { requestLogin, requestSignup } from "./api";

const handleAuth = (api, flag) => (state, actions) => {
  return api(actions[flag].getCredentials())
    .then(data => {
      return data;
    })
    .then(data => {
      sessionStorage.setItem("token", data.token);
      actions.flagAuth(true);
      actions.connect();
      actions.location.go("/");
    })
    .catch(console.error);
};

const flagAuth = authenticated => ({ appStatus }) => ({
  appStatus: { ...appStatus, authenticated }
});

const setUsername = username => ({ appStatus }) => ({
  appStatus: { ...appStatus, username }
});

const handleLogout = () => (state, actions) => {
  sessionStorage.removeItem("token");
  state.chat.socket.disconnect();
  actions.flagAuth(false);
};

const reAuthUser = () => (state, actions) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    actions.flagAuth(true);
    actions.connect();
  }
};

const commonActions = {
  onEnterEmail: entry => ({ email: entry }),
  onEnterPassword: entry => ({
    password: entry
  }),
  getCredentials: () => ({ email, password }) => ({ email, password })
};

const actions = {
  login: commonActions,
  signup: commonActions,
  handleLogin: handleAuth.bind(null, requestLogin, "login"),
  handleSignup: handleAuth.bind(null, requestSignup, "signup"),
  handleLogout,
  flagAuth,
  reAuthUser,
  setUsername,
};

export default actions;
