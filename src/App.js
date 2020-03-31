import React, { useState } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from "react-router-dom";
import mobiscroll from "@mobiscroll/react-lite";

import { Grid, CssBaseline, ThemeProvider } from "@material-ui/core";

import { createMuiTheme } from "@material-ui/core/styles";

import TopNav from "./navigation/TopNav";
//import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
// pages for this product
import Form from "./pages/Form";
import BottomNav from "./navigation/BottomNav";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";

import { EntriesProvider } from "./EntriesContext";

const containerStyles = {
  height: "calc(100vh - 112px)",
  overflow: "auto",
  textAlign: "center"
};

const App = () => {
  const [themeMode, setThemeMode] = useState("light");
  const [tab, setTab] = useState(0);
  let hist = createBrowserHistory();

  let theme = createMuiTheme({
    palette: {
      type: themeMode,
      primary: {
        main: themeMode === "light" ? "#4791db" : "#111"
      }
    }
  });

  function renderView() {
    switch (tab) {
      case 0:
        return <Home />;
      case 1:
        return <Dashboard />;
      case 2:
        return <Settings />;
      default:
        return new Error("This page does not exist");
    }
  }
  const handleLightMode = () => {
    document.querySelector("body").style.backgroundColor = "#fff";
    setThemeMode("light");
    mobiscroll.settings = {
      theme: "material"
    };
  };

  const handleDarkMode = () => {
    document.querySelector("body").style.backgroundColor = "#111";
    setThemeMode("dark");
    mobiscroll.settings = {
      theme: "material-dark"
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <EntriesProvider>
        <div>
          <Grid container direction="column">
            <TopNav
              themeMode={themeMode}
              lightMode={handleLightMode}
              darkMode={handleDarkMode}
            />

            <div style={containerStyles}>
              <Route exact path="/" component={Home} />
              <Route path="/form/:date" component={Form} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/analytics" component={Analytics} />
              <Route path="/settings" component={Settings} />
            </div>
            <BottomNav value={tab} onChange={setTab} />
          </Grid>
          <CssBaseline />
        </div>
      </EntriesProvider>
    </ThemeProvider>
  );
};

export default withRouter(App);
