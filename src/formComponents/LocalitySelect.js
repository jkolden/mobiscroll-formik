import React, { useState } from "react";
import Projects from "../assets/static/Projects";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

export default function LocalitySelect({ hourlyEntry, handleChange }) {
  return (
    <React.Fragment>
      <div className="mbsc-form-group-title">Locality</div>
      <mobiscroll.Radio
        name="group"
        value="Chicago"
        checked={hourlyEntry["locality"] === "Chicago"}
        onChange={handleChange("locality")}
      >
        Chicago
      </mobiscroll.Radio>
      <mobiscroll.Radio
        name="group"
        value="Denver"
        onChange={handleChange("locality")}
        checked={hourlyEntry["locality"] === "Denver"}
      >
        Denver
      </mobiscroll.Radio>
      <mobiscroll.Radio
        name="group"
        value="Grand Rapids"
        onChange={handleChange("locality")}
        checked={hourlyEntry["locality"] === "Grand Rapids"}
      >
        Grand Rapids
      </mobiscroll.Radio>
    </React.Fragment>
  );
}
