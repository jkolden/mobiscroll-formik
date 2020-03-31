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
import Chicago from "../assets/images/Chicago.jpg";
import Denver from "../assets/images/Denver.png";
import Grand from "../assets/images/GrandRapids.gif";

import Projects from "../assets/static/Projects";
import Tasks from "../assets/static/Tasks";

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

  const findProject = pProject => {
    let obj = Projects.find(o => Object.keys(o) == pProject);
    return Object.values(obj);
  };

  const findTask = (pProject, pTask) => {
    let obj = Tasks[pProject].find(o => Object.keys(o) == pTask);
    return Object.values(obj);
  };

  const images = {
    Chicago: Chicago,
    Denver: Denver,
    "Grand Rapids": Grand
  };

  return (
    <div>
      <ListItem alignItems="flex-start" divider>
        <ListItemAvatar>
          <Avatar alt={entry.locality} src={images[entry.locality]} />
        </ListItemAvatar>
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
