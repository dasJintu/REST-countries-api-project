import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import CountryDetail from "./components/pages/CountryDetail";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/:id">
          <CountryDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
