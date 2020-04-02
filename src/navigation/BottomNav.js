import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { EntriesContext } from "../EntriesContext";
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
import Settings from "@material-ui/icons/Settings";
import PieChartIcon from "@material-ui/icons/PieChart";
import Home from "@material-ui/icons/Home";

function BottomNav({ val, onChange }) {
  const [entries, setEntries] = useContext(EntriesContext);

  return (
    <BottomNavigation value={val} onChange={(e, tab) => onChange(tab)}>
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        icon={<Home />}
      />

      <BottomNavigationAction
        component={Link}
        to="/analytics"
        label="Analytics"
        icon={<PieChartIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/settings"
        label="Settings"
        icon={<Settings />}
      />
    </BottomNavigation>
  );
}

export default BottomNav;
