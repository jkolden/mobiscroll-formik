import React, { useState, useContext } from "react";
import { EntriesContext } from "../EntriesContext";
import { v4 as uuidv4 } from "uuid";
import InputNumber from "rc-input-number";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

/* Icons */

function Form({ match }) {
  const [entries, setEntries] = useContext(EntriesContext);
  const [hourlyEntry, setHourlyEntry] = useState({});

  const timeCardDate = new Date(match.params.date);
  const formattedDate =
    parseInt(timeCardDate.getUTCMonth() + 1) +
    "/" +
    timeCardDate.getUTCDate() +
    "/" +
    timeCardDate.getFullYear();

  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    timeCardDate
  );
  const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(
    timeCardDate
  );
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    timeCardDate
  );

  const projects = [
    { BDO0001: "BDO Internal Productivity" },
    { DS00009: "BDO Dixon Industries" },
    { PCS10045: "BDO Milestone Billing Project" }
  ];

  const mytasks = {
    DS00009: [{ "1.0": "Pre-Implementation" }, { "2.1": "Project Plan" }],
    PCS10045: [
      { "1.0": "Documentation" },
      { "2.1": "On-Line Training Videos" },
      {
        "2.2": "Custom Help Screens"
      }
    ]
  };

  const handleChange = name => event => {
    setHourlyEntry({
      ...hourlyEntry,
      [name]: event.target.value
    });
  };

  const handleHourly = name => value => {
    setHourlyEntry({
      ...hourlyEntry,
      hours: value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    hourlyEntry.id = uuidv4();
    hourlyEntry.exp_date = formattedDate;
    hourlyEntry.isoDate = timeCardDate;

    setEntries(prevEntries => [...prevEntries, { hourlyEntry }]);
  };

  return (
    <mobiscroll.Page>
      <h3>{`${mo} ${da}, ${ye}`}</h3>
      <mobiscroll.Form onSubmit={handleSubmit}>
        <mobiscroll.FormGroup>
          <mobiscroll.FormGroupTitle>
            Project Selection
          </mobiscroll.FormGroupTitle>
          <mobiscroll.Dropdown
            value={hourlyEntry["project"]}
            label="Project"
            name="project"
            onChange={handleChange("project")}
          >
            <option>Select</option>
            {projects.map(project => (
              <option key={Object.keys(project)} value={Object.keys(project)}>
                {`${Object.values(project)}`}
              </option>
            ))}
          </mobiscroll.Dropdown>
          <mobiscroll.Dropdown
            label="Task"
            name="task"
            onChange={handleChange("task")}
          >
            <option>Select</option>
            {hourlyEntry["project"] &&
              mytasks["DS00009"].map(obj => (
                <option key={Object.keys(obj)} value={Object.keys(obj)}>
                  {`${Object.values(obj)}`}
                </option>
              ))}
          </mobiscroll.Dropdown>
        </mobiscroll.FormGroup>

        <div className="mbsc-form-group">
          <div className="mbsc-form-group-title">Work Type</div>
          <mobiscroll.Segmented
            name="worktype"
            value="Internal"
            checked={hourlyEntry["worktype"] === "internal"}
            onChange={handleChange("worktype")}
          >
            Internal
          </mobiscroll.Segmented>
          <mobiscroll.Segmented
            name="worktype"
            value="External"
            checked={hourlyEntry["worktype"] === "external"}
            onChange={handleChange("worktype")}
          >
            External
          </mobiscroll.Segmented>
        </div>

        <div className="mbsc-form-group">
          <div className="mbsc-form-group-title">Locality</div>
          <mobiscroll.Radio
            name="group"
            value="Chicago"
            defaultChecked
            onChange={handleChange("locality")}
          >
            Chicago
          </mobiscroll.Radio>
          <mobiscroll.Radio
            name="group"
            value="Denver"
            onChange={handleChange("locality")}
          >
            Denver
          </mobiscroll.Radio>
          <mobiscroll.Radio
            name="group"
            value="Grand Rapids"
            onChange={handleChange("locality")}
          >
            Grand Rapids
          </mobiscroll.Radio>
        </div>

        <InputNumber
          step={0.5}
          name="hours"
          min={0}
          max={12}
          value={hourlyEntry["hours"]}
          onChange={handleHourly("hours")}
        />
        <label>Hours</label>

        <div className="mbsc-btn-group-block">
          <mobiscroll.Button type="submit">Save</mobiscroll.Button>
        </div>
      </mobiscroll.Form>
    </mobiscroll.Page>
  );
}

export default Form;
