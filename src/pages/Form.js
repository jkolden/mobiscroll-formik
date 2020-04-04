import React, { useState, useEffect, useContext } from "react";
import { EntriesContext } from "../EntriesContext";
import ProjectSelect from "../formComponents/ProjectSelect";
import TaskSelect from "../formComponents/TaskSelect";
import LocalitySelect from "../formComponents/LocalitySelect";
import WorkTypeSelect from "../formComponents/WorkTypeSelect";

import { makeStyles } from "@material-ui/core/styles";

import { v4 as uuidv4 } from "uuid";

import { useHistory } from "react-router-dom";

import utcDateParamFormat from "../utilities/utcDateParamFormat";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

import Tasks from "../assets/static/Tasks";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: "none"
  }
}));

function Form({ match }) {
  const [projectValid, setProjectValid] = useState(true);
  const [taskValid, setTaskValid] = useState(true);

  const [entries, setEntries] = useContext(EntriesContext);
  const classes = useStyles();

  const [hourlyEntry, setHourlyEntry] = useState({
    hours: "",
    locality: "Chicago",
    worktype: "External"
  });

  const history = useHistory();

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

    if (name === "project" && event.target.value) {
      setProjectValid(true);
    }

    if (name === "task" && event.target.value) {
      setTaskValid(true);
    }
  };

  const handleSubmit = event => {
    if (!hourlyEntry["project"]) {
      event.preventDefault();
      setProjectValid(false);
      return;
    } else if (!hourlyEntry["task"]) {
      event.preventDefault();
      setTaskValid(false);
      return;
    }

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
    <mobiscroll.Page>
      <h3>{formattedDate}</h3>
      <mobiscroll.Form onSubmit={handleSubmit}>
        <mobiscroll.FormGroup>
          <mobiscroll.FormGroupTitle>
            Project Selection
          </mobiscroll.FormGroupTitle>
          <ProjectSelect
            hourlyEntry={hourlyEntry}
            handleChange={handleChange}
            valid={projectValid}
          />
          <TaskSelect
            hourlyEntry={hourlyEntry}
            handleChange={handleChange}
            valid={taskValid}
          />
        </mobiscroll.FormGroup>

        <div className="mbsc-form-group">
          <WorkTypeSelect
            hourlyEntry={hourlyEntry}
            handleChange={handleChange}
          />
        </div>

        <div className="mbsc-form-group">
          <LocalitySelect
            hourlyEntry={hourlyEntry}
            handleChange={handleChange}
          />
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
      </mobiscroll.Form>
    </mobiscroll.Page>
  );
}

export default Form;
