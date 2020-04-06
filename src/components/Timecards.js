import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "@material-ui/core/List";
import CardListDisplay from "../components/CardListDisplay";

import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import DateFormat from "../utilities/DateFormat";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
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
    width: "100%",
  },
}));

const Timecards = (props) => {
  const { timecards, startdate } = props;
  let displayDate = new Date(startdate);

  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Paper className={classes.paper}>
          <List className={classes.root}>
            <h2>Timecards for Week:</h2>
            <h3>{DateFormat(displayDate)}</h3>
            {timecards.map((timecard) => (
              <CardListDisplay key={timecard.card_title} timecard={timecard} />
            ))}
          </List>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Timecards;
