import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Search from "./Search";
import "../scss/styles.scss";

const App = ({

}) => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/search" />
        </Route>
        <Route path="/search" component={Search} />
      </Switch>
    </Router>
  );
};

export default App;