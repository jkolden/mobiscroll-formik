import React from "react";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

export default function WorkTypeSelect({ hourlyEntry, handleChange }) {
  return (
    <React.Fragment>
      <div className="mbsc-form-group-title">Work Type</div>
      <mobiscroll.Segmented
        name="worktype"
        value="Internal"
        checked={hourlyEntry["worktype"] === "Internal"}
        onChange={handleChange("worktype")}
      >
        Internal
      </mobiscroll.Segmented>
      <mobiscroll.Segmented
        name="worktype"
        value="External"
        checked={hourlyEntry["worktype"] === "External"}
        onChange={handleChange("worktype")}
      >
        External
      </mobiscroll.Segmented>
    </React.Fragment>
  );
}
