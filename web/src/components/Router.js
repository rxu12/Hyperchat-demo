import { h } from "hyperapp";
import { Switch, Link, Route, location } from "@hyperapp/router";
import Auth from "./Auth";
import requireAuth from "../hoc/requireAuth";
import MainView from "./Main";

const Router = ({ actions, state }) => {
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={({ location, match }) =>
          requireAuth({ location, match, actions, state }, MainView)
        }
      />
      <Route
        path="/login"
        render={({ location, match }) => (
          <Auth {...{ location, match, actions, state }} isLogin />
        )}
      />
      <Route
        path="/signup"
        render={({ location, match }) => (
          <Auth {...{ location, match, actions, state }} />
        )}
      />
      <Route
        render={({ location, match }) => (
          <Auth {...{ location, match, actions, state }} isLogin />
        )}
      />
    </Switch>
  );
};

export default Router;
