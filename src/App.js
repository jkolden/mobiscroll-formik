import React, { useState, useEffect } from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import TopNav from "./TopNav";
import Settings from "./Settings";
//import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

// pages for this product
import Mobiscroll from "./Mobiscroll";
import BottomNav from "./BottomNav";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

import { EntriesProvider } from "./EntriesContext";

const containerStyles = {
  height: "calc(100vh - 112px)",
  overflow: "auto",
  textAlign: "center"
};

function App() {
  const [tab, setTab] = useState(0);
  let hist = createBrowserHistory();

  function renderView() {
    switch (tab) {
      case 0:
        return <Home />;
      case 1:
        return <Mobiscroll />;
      case 2:
        return <Dashboard />;
      default:
        return new Error("This page does not exist");
    }
  }

  return (
    <EntriesProvider>
      <div>
        <Grid container direction="column">
          <TopNav />
          <div style={containerStyles}>{renderView()}</div>
          <BottomNav value={tab} onChange={setTab} />
        </Grid>
        <CssBaseline />
      </div>
    </EntriesProvider>
  );
}

export default App;
