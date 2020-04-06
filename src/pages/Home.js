import React, { useState, useEffect, useContext } from "react";
import { EntriesContext } from "../EntriesContext";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Copyright from "../components/Copyright";
import DefaultDate from "../utilities/DefaultDate";

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
  title: {
    flexGrow: 1
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
  const [entries, setEntries] = useContext(EntriesContext);
  console.log(entries);

  useEffect(() => {
    let startDay;
    startDay =
      selectedDays.length > 0
        ? selectedDays[0].toLocaleDateString()
        : "3/15/2020";

    fetch(
      `https://apex.oracle.com/pls/apex/myfusion/bdo/web_sheets/?start_date=${startDay}`
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
