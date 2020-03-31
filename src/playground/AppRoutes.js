import React, { Component, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Mobiscroll = lazy(() => import("./Mobiscroll"));

class AppRoutes extends Component {
  render() {
    return (
      <Suspense>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/form" component={Mobiscroll} />
        </Switch>
      </Suspense>
    );
  }
}

export default AppRoutes;
