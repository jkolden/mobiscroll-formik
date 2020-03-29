import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";
import { DatePicker } from "@material-ui/pickers";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import SimpleList from "./SimpleList";

/* Icons */

mobiscroll.settings = {
  theme: "auto"
};

function Mob() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [formData, setFormData] = useState({});

  function handeSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    console.log(data);
  }

  const handleChange = name => event => {
    setFormData({
      ...formData,
      [name]: event.target.value
    });
    console.log(formData);
  };

  return (
    <mobiscroll.Page>
      <form onSubmit={handeSubmit}>
        <mobiscroll.FormGroup>
          <input
            onChange={handleChange("name")}
            name="first"
            placeholder="What is your first name?"
          />

          <mobiscroll.FormGroupTitle>Date</mobiscroll.FormGroupTitle>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
              label="Timecard Date"
              fullWidth
              onChange={handleDateChange}
              value={selectedDate}
              animateYearScrolling
            />
          </MuiPickersUtilsProvider>

          <mobiscroll.FormGroupTitle>
            Project Selection
          </mobiscroll.FormGroupTitle>
          <mobiscroll.Dropdown label="Project" name="project">
            <option>Select</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </mobiscroll.Dropdown>
          <mobiscroll.Dropdown label="Task" name="task">
            <option>Select</option>
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </mobiscroll.Dropdown>
        </mobiscroll.FormGroup>

        <div className="mbsc-form-group">
          <div className="mbsc-form-group-title">Work Type</div>
          <mobiscroll.Segmented name="gender" defaultChecked>
            Internal
          </mobiscroll.Segmented>
          <mobiscroll.Segmented name="gender">External</mobiscroll.Segmented>
        </div>

        <div className="mbsc-form-group">
          <div className="mbsc-form-group-title">Locality</div>
          <mobiscroll.Radio name="group" defaultChecked>
            Chicago
          </mobiscroll.Radio>
          <mobiscroll.Radio name="group">Denver</mobiscroll.Radio>
          <mobiscroll.Radio name="group">Grand Rapids</mobiscroll.Radio>
        </div>

        <div className="mbsc-btn-group-block">
          <mobiscroll.Button>Save</mobiscroll.Button>
        </div>
        <div className="mbsc-btn-group-block">
          <mobiscroll.Button type="submit">Submit</mobiscroll.Button>
        </div>
      </form>
      <mobiscroll.FormGroup>
        <div className="mbsc-form-group">
          <SimpleList />
        </div>
      </mobiscroll.FormGroup>
    </mobiscroll.Page>
  );
}

export default Mob;
