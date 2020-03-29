import React, { useContext, useEffect, useState } from "react";
import { EntriesContext } from "../EntriesContext";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import DailyHours from "../components/DailyHours";
import SimpleList from "../SimpleList";
import SnackBar from "../components/SnackBar";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Oracle Demo Engineering
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    height: 180
  }
}));

export default function Dashboard() {
  const [entries, setEntries] = useContext(EntriesContext);
  const [total, setTotal] = useState();
  const [open, setOpen] = useState(false);

  const sum = entries.reduce(function(tot, record) {
    return tot + record.hourlyEntry.hours;
  }, 0);

  const filter = id => {
    const filtered = entries.filter(entry => entry.hourlyEntry.id !== id);
    setEntries(filtered);
  };

  useEffect(() => {
    setTotal(sum);
  }, []);

  const handleSubmit = () => {
    fetch("https://apex.oracle.com/pls/apex/myfusion/bdo/web_hours/", {
      method: "POST",
      body: JSON.stringify(entries)
    });
    setOpen(true);
    setEntries([]);
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
                <DailyHours total={total} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper>
                <SimpleList
                  setTotal={setTotal}
                  setTotal={setTotal}
                  sum={sum}
                  filter={filter}
                />
              </Paper>
            </Grid>
            {/* Recent Orders */}
          </Grid>
          <Box pt={4}>
            <div className="mbsc-btn-group-block">
              <mobiscroll.Button
                type="submit"
                color="primary"
                onClick={handleSubmit}
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
