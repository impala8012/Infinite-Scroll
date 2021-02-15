import React, { useState } from "react";
import Repo from "../Repo"
import Header from "../Header"
import AboutMe from "../AboutMe";
import { LoadingContext } from "../../contexts";
import { HashRouter as Router, Switch, Route } from "react-router-dom"

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <Router>
        <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
          <Header />
          <Switch>
            <Route exact path="/">
              <Repo />
            </Route>
            <Route path="/aboutMe">
              <AboutMe />
            </Route>
          </Switch>
        </LoadingContext.Provider>
      </Router>
    </>
  );
}