import React, { useContext, useEffect, useState } from "react";
import { EntriesContext } from "../EntriesContext";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DailyHours from "../components/DailyHours";
import SimpleList from "../components/SimpleList";
import Spinner from "../hooks/Spinner";

import utcDateParamFormat from "../utilities/utcDateParamFormat";
import LongDateFormat from "../utilities/LongDateFormat";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  float: {
    float: "left",
  },
  buttonContainer: {
    display: "flex",
  },
  buttons: {
    width: "100%",
    margin: ".5em",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 180,
  },
}));

export default function DailySummary({ match }) {
  const { data, fetchEntries, filter, handleSubmit, sum, loading } = useContext(
    EntriesContext
  );
  const [total, setTotal] = useState();

  const history = useHistory();

  const localDate = new Date(match.params.date);
  const paramDate = match.params.date;

  let utcDate = utcDateParamFormat(localDate); //coverts back to UTC
  let LongDateString = LongDateFormat(paramDate);

  useEffect(() => {
    fetchEntries(utcDate);

    localStorage.setItem("utcDate", paramDate);
  }, []);

  const handleRedirect = () => {
    history.push(`/form/${localStorage.getItem("utcDate")}`);
  };

  const sweetAlert = () => {
    swal({
      title: "Ready to submit this timecard?",
      text: "This will send your timecard to Oracle Cloud Projects",
      icon: "info",
      buttons: ["Cancel", "Submit"],
      dangerMode: false,
    }).then((submitted) => {
      if (submitted) {
        handleSubmit(utcDate);
        swal("Thank you, your timecard has been submitted!", {
          icon: "success",
        });
        history.push("/");
      } else {
        swal("OK, you can keep working on this timecard", {
          icon: "info",
        });
      }
    });
  };

  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {loading === true ? (
            <Spinner />
          ) : (
            <React.Fragment>
              <Grid container spacing={3}>
                {/* This Timecard */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper className={fixedHeightPaper}>
                    <DailyHours
                      total={total}
                      timeCardDate={LongDateString}
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
                <div className={classes.buttonContainer}>
                  <Button
                    className={classes.buttons}
                    variant="contained"
                    onClick={handleRedirect}
                    disabled={data.ess_id ? true : false}
                  >
                    Add Time
                  </Button>

                  <Button
                    className={classes.buttons}
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={sweetAlert}
                    disabled={data.ess_id ? true : false}
                  >
                    Submit
                  </Button>
                </div>
              </Box>
            </React.Fragment>
          )}
        </Container>
      </main>
    </div>
  );
}
