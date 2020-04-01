import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { EntriesContext } from "../EntriesContext";

import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

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

export default function CardListDisplay(props) {
  const { timecard } = props;
  const classes = useStyles();

  return (
    <div>
      <ListItem alignItems="flex-start" divider>
        <ListItemAvatar>
          <Avatar alt={timecard.card_title} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={`${timecard.card_initials} ${timecard.card_title}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`Hours: ${timecard.hours}`}
              </Typography>
            </React.Fragment>
          }
        />
        <ListItemSecondaryAction>
          {timecard.date_submitted === "Not Submitted" && (
            <Link
              to={1 == 2 ? `/form/${timecard.timecard_date}` : `/dashboard`}
            >
              <IconButton edge="end" aria-label="delete">
                <ChevronRightIcon />
              </IconButton>
            </Link>
          )}
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
