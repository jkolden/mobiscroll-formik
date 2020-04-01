import React, { useContext, useState } from "react";
import { EntriesContext } from "../EntriesContext";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import DateFormat from "../utilities/DateFormat";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function DailyHours(props) {
  const [entries, setEntries] = useContext(EntriesContext);
  const { total } = props;
  const classes = useStyles();

  console.log(entries);

  const sum = entries.reduce(function(tot, record) {
    return tot + record.hourlyEntry.hours;
  }, 0);

  return (
    <React.Fragment>
      <Typography variant="h6">Total Hours for this Timecard</Typography>
      <Typography
        variant="h6"
        color="textPrimary"
        className={classes.depositContext}
      >
        {entries.length > 0 &&
          DateFormat(new Date(entries[0]["hourlyEntry"].exp_date))}
      </Typography>
      <Typography variant="h4">{sum}</Typography>
    </React.Fragment>
  );
}
