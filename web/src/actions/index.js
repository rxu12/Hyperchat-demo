import authActions from './auth'
import * as socketActions from "./socket";
import * as chat from "./chat";

const actions = {
  ...authActions,
  ...socketActions,
  chat
};

export default actions;
