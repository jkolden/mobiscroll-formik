import React, { useContext } from "react";
import { EntriesContext } from "../EntriesContext";

import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/icons/Comment";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
}));

export default function ListItemDisplay(props) {
  const [entries, setEntries] = useContext(EntriesContext);

  const { entry, filter } = props;
  const classes = useStyles();

  return (
    <div>
      <ListItem alignItems="flex-start" divider>
        <ListItemAvatar>
          <Avatar alt={entry.locality} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={`Project: ${entry.project}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`Hours: ${entry.hours}`}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => filter(entry.id)}
          >
            <HighlightOffIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
