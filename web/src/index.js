import App from "./components/App";
import withRouter from "./hoc/withRouter";
import state from "./state";
import actions from "./actions";

const appInstance = withRouter(
  actions,
  state,
  App,
  document.querySelector("#v-dom-entry")
);
appInstance.reAuthUser();
