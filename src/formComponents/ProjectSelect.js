import React, { useState } from "react";
import Projects from "../assets/static/Projects";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

export default function ProjectSelect({ hourlyEntry, handleChange, valid }) {
  return (
    <mobiscroll.Dropdown
      valid={valid}
      errorMessage="Project selection is required"
      value={hourlyEntry["project"]}
      label="Project"
      name="project"
      onChange={handleChange("project")}
      defaultValue=""
    >
      <option disabled value="">
        Select
      </option>
      {Projects.map(project => (
        <option key={Object.keys(project)} value={Object.keys(project)}>
          {`${Object.values(project)}`}
        </option>
      ))}
    </mobiscroll.Dropdown>
  );
}
