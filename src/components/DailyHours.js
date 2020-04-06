import React, { useContext } from "react";
import { EntriesContext } from "../EntriesContext";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function DailyHours(props) {
  const { data } = useContext(EntriesContext);
  const { total, timeCardDate, apiSubmissionDate } = props;
  const classes = useStyles();

  const sum = data.entries.reduce(function (tot, record) {
    return tot + record.hours;
  }, 0);

  return (
    <React.Fragment>
      <Typography variant="h6" color="textSecondary">
        Total Hours for this Timecard
      </Typography>
      <Typography
        variant="h6"
        color="textSecondary"
        className={classes.depositContext}
      >
        {timeCardDate}
      </Typography>
      <Typography variant="h3">{sum}</Typography>
    </React.Fragment>
  );
}
