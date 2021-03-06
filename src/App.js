import React, { useState, useEffect } from "react";
import {
  withRouter,
  BrowserRouter as Router,
  Link,
  Switch,
  Route,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import mobiscroll from "@mobiscroll/react-lite";
import "./App.css";

import { Grid, CssBaseline, ThemeProvider } from "@material-ui/core";

import { createMuiTheme } from "@material-ui/core/styles";

import TopNav from "./navigation/TopNav";
//import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
// pages for this product
import Form from "./pages/Form";
import BottomNav from "./navigation/BottomNav";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import DailySummary from "./pages/DailySummary";

import { EntriesProvider } from "./EntriesContext";

const containerStyles = {
  height: "calc(100vh - 112px)",
  overflow: "auto",
  textAlign: "center",
};

const App = () => {
  const [themeMode, setThemeMode] = useState("dark");
  const [tab, setTab] = useState(0);

  let theme = createMuiTheme({
    palette: {
      type: themeMode,
      primary: {
        main: themeMode === "light" ? "#2196f3" : "#111",
      },
    },
  });

  useEffect(() => {
    let themePreference = localStorage.getItem("theme");
    if (themePreference) {
      //material ui theme
      setThemeMode(themePreference);
      //mobiscroll theme
      mobiscroll.settings = {
        theme: "ios",
        themeVariant: themePreference,
      };
    }
  }, []);

  const handleLightMode = () => {
    document.querySelector("body").style.backgroundColor = "#fff";
    setThemeMode("light");
    localStorage.setItem("theme", "light");

    mobiscroll.settings = {
      theme: "ios",
      themeVariant: "light",
    };
  };

  const handleDarkMode = () => {
    document.querySelector("body").style.backgroundColor = "#111";
    setThemeMode("dark");
    localStorage.setItem("theme", "dark");
    mobiscroll.settings = {
      theme: "ios",
      themeVariant: "dark",
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
              <Route
                render={({ location }) => (
                  <TransitionGroup>
                    <CSSTransition
                      mountOnEnter={false}
                      unmountOnExit={true}
                      timeout={1000}
                      classNames="fade"
                      key={location.key}
                    >
                      <Switch location={location}>
                        <Route exact path="/" component={Home} />
                        <Route path="/form/:date/:id?" component={Form} />
                        <Route
                          path="/dailysummary/:date"
                          component={DailySummary}
                        />
                        <Route path="/analytics" component={Analytics} />
                        <Route path="/settings" component={Settings} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}
              />
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
