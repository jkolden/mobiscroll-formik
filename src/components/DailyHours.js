import React, { useContext, useState } from "react";
import { EntriesContext } from "../EntriesContext";

import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1
  }
});

export default function DailyHours(props) {
  const [entries, setEntries] = useContext(EntriesContext);
  const { total } = props;
  const classes = useStyles();

  const sum = entries.reduce(function(tot, record) {
    return tot + record.hourlyEntry.hours;
  }, 0);

  return (
    <React.Fragment>
      <Title>Total Hours for this Timecard</Title>
      <Typography component="p" variant="h4">
        {sum}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </React.Fragment>
  );
}
