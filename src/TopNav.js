import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  Typography,
  IconButton,
  SwipeableDrawer,
  Dialog,
  Slide,
  Icon
} from "@material-ui/core";
import { Menu, KeyboardBackspace, Favorite } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import emily from "./assets/images/emily.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(2)
  }
}));

const SlideTransition = React.forwardRef(function TransitionComponent(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function TopNav() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dialogueOpen, setDialogueOpen] = useState(false);

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton color="inherit" onClick={() => setOpen(!open)}>
          <Menu />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <Avatar src={emily} onClick={() => setDialogueOpen(true)}></Avatar>
      </Toolbar>{" "}
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableSwipeToOpen={false}
        PaperProps={{ style: { minWidth: "50vw" } }}
      >
        <span>Navigation</span>
      </SwipeableDrawer>
      <Dialog
        open={dialogueOpen}
        fullScreen
        TransitionComponent={SlideTransition}
      >
        <IconButton onClick={() => setDialogueOpen(false)}>
          <KeyboardBackspace />
        </IconButton>
        <p>
          Built with <Favorite /> by Demo Engineering and Proposals
        </p>
      </Dialog>
    </AppBar>
  );
}
