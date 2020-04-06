import React, { useContext } from "react";
import { EntriesContext } from "./EntriesContext";
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import ListItemDisplay from "./components/ListItemDisplay";

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
  const { setTotal, sum, filter, essId } = props;
  const [entries, setEntries] = useContext(EntriesContext);

  const classes = useStyles();

  return (
    <div>
      <List className={classes.root}>
        {entries.map((entry) => (
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
