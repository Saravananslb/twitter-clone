import React, { useReducer } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { Pages } from "./pages";

import "./App.css";
import { reducer } from "./store/reducer";
import { Context } from "./store/store";

const initialState = {
  activeTweet: {},
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Router>
        <Pages />
      </Router>
    </Context.Provider>
  );
}

export default App;
