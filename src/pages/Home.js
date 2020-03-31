import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import Copyright from "../components/Copyright";
import DefaultDate from "../assets/static/DefaultDate";

import WeekSelectorHooks from "../components/WeekSelectorHooks";
import Timecards from "../components/Timecards";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 350
  }
}));

export default function Home() {
  const [selectedDays, setSelectedDays] = useState(DefaultDate);
  const [timecards, setTimecards] = useState([]);

  useEffect(() => {
    let startDay;
    startDay =
      selectedDays.length > 0
        ? selectedDays[0].toLocaleDateString()
        : "3/15/2020";
    console.log(selectedDays);

    fetch(
      `https://apex.oracle.com/pls/apex/myfusion/bdo/test/?start_date=${startDay}`
    )
      .then(res => res.json())
      .then(data => setTimecards(data.items));
  }, [selectedDays]);

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography variant="h5" gutterBottom>
          Welcome Emily!
        </Typography>
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                <WeekSelectorHooks
                  selectedDays={selectedDays}
                  setSelectedDays={setSelectedDays}
                />
              </Paper>
            </Grid>
            {/*
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
               <Chart timecards={timecards} />
              </Paper>
            </Grid>
            */}
            {/*
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}><PieChart /></Paper>
            </Grid>
               */}
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            {selectedDays.length > 0 && (
              <Timecards
                timecards={timecards}
                startdate={
                  selectedDays.length > 0
                    ? selectedDays[0].toLocaleDateString()
                    : ""
                }
              />
            )}
          </Grid>
          <Grid item xs={12} md={4} lg={3}></Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
