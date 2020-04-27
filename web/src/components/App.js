import { h } from "hyperapp";
import Router from "./Router";
import './App.css'

const App = (state, actions) => {
  return (
    <div className={'container-app'}>
      <Router {...{ actions, state }} />
    </div>
  );
};

export default App;
