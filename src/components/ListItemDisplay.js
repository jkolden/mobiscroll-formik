import React, { useContext } from "react";
import { EntriesContext } from "../EntriesContext";
import { Link } from "react-router-dom";

import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Chicago from "../assets/images/Chicago.jpg";
import Denver from "../assets/images/Denver.png";
import Grand from "../assets/images/GrandRapids.gif";

import Projects from "../assets/static/Projects";
import Tasks from "../assets/static/Tasks";

import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function ListItemDisplay(props) {
  const { entry, filter, essId } = props;
  const classes = useStyles();

  const findProject = (pProject) => {
    let obj = Projects.find((o) => Object.keys(o) == pProject);
    return Object.values(obj);
  };

  const findTask = (pProject, pTask) => {
    let obj = Tasks[pProject].find((o) => Object.keys(o) == pTask);
    return Object.values(obj);
  };

  const images = {
    Chicago: Chicago,
    Denver: Denver,
    "Grand Rapids": Grand,
  };

  return (
    <div>
      <ListItem alignItems="flex-start" divider>
        {!essId ? (
          <Link to={`/form/${localStorage.getItem("utcDate")}/${entry.id}`}>
            <ListItemAvatar>
              <Avatar alt={entry.locality} src={images[entry.locality]} />
            </ListItemAvatar>
          </Link>
        ) : (
          <ListItemAvatar>
            <Avatar alt={entry.locality} src={images[entry.locality]} />
          </ListItemAvatar>
        )}

        <ListItemText
          primary={`Project: ${findProject(entry.project)}`}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`${findTask(entry.project, entry.task)}, ${entry.hours} Hours`}
              </Typography>
            </React.Fragment>
          }
        />

        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            disabled={essId ? true : false}
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
