import React, { useState, useEffect, useContext } from "react";
import { EntriesContext } from "../EntriesContext";

import { makeStyles } from "@material-ui/core/styles";

import { v4 as uuidv4 } from "uuid";

import { useHistory } from "react-router-dom";

import utcDateParamFormat from "../utilities/utcDateParamFormat";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

import FormControl from "@material-ui/core/FormControl";

import Select from "@material-ui/core/Select";

import Projects from "../assets/static/Projects";
import Tasks from "../assets/static/Tasks";
import InputLabel from "@material-ui/core/InputLabel";
import InternalExternal from "../components/InternalExternal";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 350
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

function Form1({ match }) {
  const [entries, setEntries] = useContext(EntriesContext);
  const classes = useStyles();

  const [hourlyEntry, setHourlyEntry] = useState({
    hours: "",
    locality: "Chicago",
    worktype: "External"
  });

  const history = useHistory();
  console.log(history);

  const timeCardDate = new Date(match.params.date);
  const paramDate = match.params.date;

  const formattedDate = utcDateParamFormat(timeCardDate);

  useEffect(() => {
    localStorage.setItem("utcDate", paramDate);
    if (match.params.id) {
      let entry = entries.find(entry => entry.id == match.params.id);
      setHourlyEntry(entry);
    }
  }, []);

  const handleCancel = () => {
    history.goBack();
  };

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

  const handleNumberChange = name => event => {
    setHourlyEntry({
      ...hourlyEntry,
      [name]: event.target.valueAsNumber
    });
  };

  const handleChange = name => event => {
    setHourlyEntry({
      ...hourlyEntry,
      [name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    hourlyEntry.id = hourlyEntry.id || uuidv4();
    hourlyEntry.exp_date = formattedDate;

    const myentries = [{ hourlyEntry: hourlyEntry }];

    fetch("https://apex.oracle.com/pls/apex/myfusion/bdo/web_hours/", {
      method: "POST",
      body: JSON.stringify(myentries)
    }).then(res => {
      if (res.status == 200) {
        history.push(`/dailysummary/${localStorage.getItem("utcDate")}`);
      }
    });
  };

  return (
    <div>
      <h3>{formattedDate}</h3>
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl} required>
          <InputLabel htmlFor="age-native-simple">Project</InputLabel>
          <Select
            fullWidth
            native
            value={hourlyEntry["project"]}
            onChange={handleChange("project")}
            inputProps={{
              name: "project",
              id: "task"
            }}
          >
            <option>Select</option>
            {Projects.map(project => (
              <option key={Object.keys(project)} value={Object.keys(project)}>
                {`${Object.values(project)}`}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="task">Task</InputLabel>
          <Select
            required
            fullWidth
            native
            value={hourlyEntry["task"]}
            onChange={handleChange("task")}
            inputProps={{
              name: "task",
              id: "task"
            }}
          >
            <option>Select</option>
            {hourlyEntry["project"] &&
              Tasks[hourlyEntry["project"]].map(obj => (
                <option key={Object.keys(obj)} value={Object.keys(obj)}>
                  {`${Object.values(obj)}`}
                </option>
              ))}
          </Select>
        </FormControl>
        <InternalExternal
          hourlyEntry={hourlyEntry}
          handleChange={handleChange}
        />

        <div className="mbsc-form-group">
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
        </div>

        <div className="mbsc-form-group">
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
        </div>

        <div>
          <label htmlFor="hours">Hours</label>
          <input
            style={{ textAlign: "right" }}
            required
            id="hours"
            name="hours"
            type="number"
            inputMode="decimal"
            min={0.0}
            max={12}
            step={0.25}
            value={hourlyEntry["hours"]}
            onChange={handleNumberChange("hours")}
          />
        </div>

        <div className="mbsc-btn-group-justified">
          <mobiscroll.Button onClick={handleCancel}>Cancel</mobiscroll.Button>
          <mobiscroll.Button type="submit">Save</mobiscroll.Button>
        </div>
      </form>
    </div>
  );
}

export default Form1;
