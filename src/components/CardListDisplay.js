import React from "react";
import { Link } from "react-router-dom";
import { deepOrange, deepPurple, indigo, red } from "@material-ui/core/colors";

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
import ChevronRightIcon from "@material-ui/icons/ChevronRight";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500]
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500]
  }
}));

export default function CardListDisplay(props) {
  const { timecard } = props;
  const classes = useStyles();

  return (
    <div>
      <ListItem alignItems="flex-start" divider>
        <ListItemAvatar>
          <Avatar
            alt={timecard.card_title}
            src="/static/images/avatar/1.jpg"
            className={
              timecard.card_title.substr(0, 1) != "S" ? classes.red : ""
            }
          />
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
          <Link
            to={
              timecard.hours == 0
                ? `/form/${timecard.timecard_date}`
                : `/dailysummary/${timecard.timecard_date}`
            }
          >
            <IconButton edge="end" aria-label="delete">
              <ChevronRightIcon />
            </IconButton>
          </Link>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}
