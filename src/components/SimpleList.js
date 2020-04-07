import React, { useContext } from "react";
import { EntriesContext } from "../EntriesContext";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import ListItemDisplay from "./ListItemDisplay";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function SimpleList(props) {
  const { filter, essId } = props;
  const { data } = useContext(EntriesContext);

  const classes = useStyles();

  return (
    <div>
      <List className={classes.root}>
        {data.entries.map((entry) => (
          <ListItemDisplay
            entry={entry}
            key={entry.id}
            filter={filter}
            essId={essId}
          />
        ))}
      </List>
    </div>
  );
}
