import React, { useContext } from "react";
import { EntriesContext } from "./EntriesContext";
/* import mobiscroll */
import {
  BottomNavigation,
  BottomNavigationAction,
  Badge,
  StyledBadge
} from "@material-ui/core";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

/* Icons */

import List from "@material-ui/icons/List";
import EditIcon from "@material-ui/icons/Edit";
import Home from "@material-ui/icons/Home";
import Mobiscroll from "./Mobiscroll";

function BottomNav({ val, onChange }) {
  const [entries, setEntries] = useContext(EntriesContext);

  return (
    <BottomNavigation value={val} onChange={(e, tab) => onChange(tab)}>
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Time Entry" icon={<EditIcon />} />
      <BottomNavigationAction
        label="Hours"
        icon={
          <Badge badgeContent={entries.length} color="secondary">
            <List />
          </Badge>
        }
      />
    </BottomNavigation>
  );
}

export default BottomNav;
