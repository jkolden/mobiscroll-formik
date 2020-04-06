import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { EntriesContext } from "../EntriesContext";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";
import { deepOrange, deepPurple, red, green } from "@material-ui/core/colors";

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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  red: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  green: {
    color: theme.palette.getContrastText(green[300]),
    backgroundColor: green[300],
  },
}));

const override = css`
  display: block;
  margin: 0 auto;
`;

export default function CardListDisplay(props) {
  const { data } = useContext(EntriesContext);
  const { timecard } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState();

  useEffect(() => {
    if (timecard.timecard_date === data.timecard_date) {
      setLoading(data.loading);
    }
  }, [data]);

  const colors = {
    S: "",
    M: classes.red,
    T: classes.red,
    W: classes.red,
    T: classes.red,
    F: classes.red,
  };

  return (
    <div>
      <ListItem alignItems="flex-start" divider>
        <ListItemAvatar>
          {loading ? (
            <ScaleLoader css={override} />
          ) : (
            <Avatar
              alt={timecard.card_title}
              src="/static/images/avatar/1.jpg"
              className={
                timecard.api_status == 200
                  ? classes.green
                  : colors[timecard.card_title.substr(0, 1)]
              }
            />
          )}
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
        {!loading && (
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
        )}
      </ListItem>
    </div>
  );
}
