import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

export default function InternalExternal({ hourlyEntry, handleChange }) {
  return (
    <React.Fragment>
      <div>
        <input
          type="radio"
          id="Internal"
          name="worktype"
          value="Internal"
          checked={hourlyEntry["worktype"] === "Internal"}
          onChange={handleChange("worktype")}
        />
        <label for="Internal">Internal</label>
        <br></br>
        <input
          type="radio"
          id="External"
          name="worktype"
          value="External"
          onChange={handleChange("worktype")}
          checked={hourlyEntry["worktype"] === "External"}
        />
        <label for="External">External</label>
      </div>
    </React.Fragment>
  );
}
