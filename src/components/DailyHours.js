import React, { useContext } from "react";
import { EntriesContext } from "../EntriesContext";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function DailyHours(props) {
  const [entries, setEntries] = useContext(EntriesContext);
  const { total, timeCardDate } = props;
  const classes = useStyles();

  const sum = entries.reduce(function(tot, record) {
    return tot + record.hours;
  }, 0);

  return (
    <React.Fragment>
      <Typography variant="h6">Total Hours for this Timecard</Typography>
      <Typography
        variant="h6"
        color="textPrimary"
        className={classes.depositContext}
      >
        {timeCardDate}
      </Typography>
      <Typography variant="h4">{sum}</Typography>
    </React.Fragment>
  );
}
