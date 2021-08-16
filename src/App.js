import React from "react";
import { authRoutes, appRoutes } from "./Routes";
import PageNotFound from "./404/404";
import FullPageLoader from "./Components/FullPageLoader/FullPageLoader";
import Alert from "./Components/Alert/Alert";
import Layout from "./Layout/Navbar/Nav";
import { Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import history from "./history";
export default function App() {
  const authState = useSelector((state) => state.auth);

  return (
    <Router history={history}>
      <Alert />
      <Layout />

      <Switch>
        {!authState.isSignedIn
          ? authRoutes.map((route) => (
              <Route exact path={route.path} component={route.component} />
            ))
          : appRoutes.map((route) => (
              <Route exact path={route.path} component={route.component} />
            ))}

        <Route component={PageNotFound} />
      </Switch>
      <FullPageLoader />
    </Router>
  );
}
