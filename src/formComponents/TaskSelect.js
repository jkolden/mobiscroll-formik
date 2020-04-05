import React, { useState } from "react";
import Tasks from "../assets/static/Tasks";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

export default function TaskSelect({ hourlyEntry, handleChange, valid }) {
  return (
    <mobiscroll.Dropdown
      valid={valid}
      errorMessage="Task selection is required"
      value={hourlyEntry["task"]}
      label="Task"
      name="task"
      onChange={handleChange("task")}
      defaultValue=""
    >
      <option disabled value="">
        Select
      </option>
      {hourlyEntry["project"] &&
        Tasks[hourlyEntry["project"]].map(obj => (
          <option key={Object.keys(obj)} value={Object.keys(obj)}>
            {`${Object.values(obj)}`}
          </option>
        ))}
    </mobiscroll.Dropdown>
  );
}
