import React, { useContext, useEffect, useState } from "react";
import { EntriesContext } from "../EntriesContext";
import { useHistory } from "react-router-dom";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DailyHours from "../components/DailyHours";
import SimpleList from "../SimpleList";
import SnackBar from "../components/SnackBar";

import utcDateParamFormat from "../utilities/utcDateParamFormat";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    position: "absolute"
  },
  float: {
    float: "left"
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
    height: 180
  }
}));

export default function DailySummary({ match }) {
  const [entries, setEntries] = useContext(EntriesContext);
  const [total, setTotal] = useState();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({});

  const history = useHistory();

  const localDate = new Date(match.params.date);
  const paramDate = match.params.date;

  let utcDate = utcDateParamFormat(localDate); //coverts back to UTC

  const sum = entries.reduce(function(tot, record) {
    return tot + record.hours;
  }, 0);

  const filter = id => {
    const filtered = entries.filter(entry => entry.id !== id);
    setEntries(filtered);

    fetch(`https://apex.oracle.com/pls/apex/myfusion/bdo/timerecord/${id}`, {
      method: "DELETE"
    });
  };

  useEffect(() => {
    localStorage.setItem("utcDate", paramDate);
    // Update the document title using the browser API

    fetch(
      `https://apex.oracle.com/pls/apex/myfusion/bdo/summary/?timecard_date=${utcDate}`
    )
      .then(res => res.json())
      .then(data => {
        setData(data);
        setEntries(data.entries);
        setTotal(sum);
      });
  }, []);

  const handleSubmit = () => {
    setOpen(true);
    console.log(data);
  };

  const handleRedirect = () => {
    history.push(`/form/${localStorage.getItem("utcDate")}`);
  };

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* This Timecard */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <DailyHours
                  total={total}
                  timeCardDate={utcDate}
                  apiSubmissionDate={data.api_submission_date}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <SimpleList
                  setTotal={setTotal}
                  sum={sum}
                  filter={filter}
                  essId={data.ess_id}
                />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <div className="mbsc-btn-group-block">
              <div className="mbsc-btn-group-block">
                <mobiscroll.Button
                  onClick={handleRedirect}
                  color="primary"
                  disabled={data.ess_id ? true : false}
                >
                  Add Time
                </mobiscroll.Button>
              </div>

              <mobiscroll.Button
                type="submit"
                color="primary"
                onClick={handleSubmit}
                disabled={data.ess_id ? true : false}
              >
                Submit
              </mobiscroll.Button>
            </div>
          </Box>
        </Container>
      </main>
      <SnackBar open={open} setOpen={setOpen} />
    </div>
  );
}
