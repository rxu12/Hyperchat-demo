import { h } from "hyperapp";

const requireAuth = (
  { location, match, actions, state },
  composedComp,
  redir
) => {
  if (!state.appStatus.authenticated) actions.location.go(redir || "/login");
  return h(composedComp, { actions, state });
};

export default requireAuth;
