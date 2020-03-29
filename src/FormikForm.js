import React from "react";
import Button from "@material-ui/core/Button";
import { withFormik, Form, Field } from "formik";

import { TextField } from "@material-ui/core";

/* import mobiscroll */
import mobiscroll from "@mobiscroll/react-lite";
import "@mobiscroll/react-lite/dist/css/mobiscroll.min.css";

import * as yup from "yup"; // for everything

const FormikForm = ({
  values,
  errors,
  touched,
  isSubmitting,
  handleChange
}) => (
  <mobiscroll.Page>
    <Form>
      <mobiscroll.FormGroupTitle>Select</mobiscroll.FormGroupTitle>
      <mobiscroll.Dropdown
        label="Project"
        name="project"
        onChange={handleChange}
        value={values.project || ""}
      >
        <option>Select</option>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </mobiscroll.Dropdown>
      {touched.first && errors.first && <p>{errors.first}</p>}
      <mobiscroll.Input
        value={values.first || ""}
        onChange={handleChange}
        name="first"
        placeholder="What is your first name?"
      >
        First Name
      </mobiscroll.Input>

      <Field
        type="checkbox"
        name="satisfied"
        checked={values.satisfied}
        Label={{ label: "Do you like your job?" }}
      />
      <div className="mbsc-form-group-title">Work Type:</div>
      <mobiscroll.Segmented
        onChange={handleChange}
        name="worktype"
        value="Internal"
        defaultChecked
      >
        Internal
      </mobiscroll.Segmented>
      <mobiscroll.Segmented
        onChange={handleChange}
        name="worktype"
        value="External"
      >
        External
      </mobiscroll.Segmented>

      <div>
        <mobiscroll.Stepper
          name="hours"
          value={values.hours || 0}
          onChange={handleChange}
          min={0}
          max={10}
        >
          Hours Worked
        </mobiscroll.Stepper>
        <Field component="select" name="plan">
          <option value="A">Option A</option>
          <option value="B">Option B</option>
        </Field>
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Run countdown</div>

        <mobiscroll.Radio
          onChange={handleChange}
          name="locality"
          value={"Chicago"}
          defaultChecked
        >
          Chicago
        </mobiscroll.Radio>
        <mobiscroll.Radio
          onChange={handleChange}
          name="locality"
          value={"Denver"}
        >
          Denver
        </mobiscroll.Radio>
        <mobiscroll.Radio
          onChange={handleChange}
          name="locality"
          value={"Grand Rapids"}
        >
          Grand Rapids
        </mobiscroll.Radio>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </div>
      <div className="mbsc-form-group">
        <div className="mbsc-form-group-title">Run countdown</div>
        <mobiscroll.Radio name="group">Off</mobiscroll.Radio>
        <mobiscroll.Radio name="group" defaultChecked>
          3 seconds
        </mobiscroll.Radio>
        <mobiscroll.Radio name="group">6 seconds</mobiscroll.Radio>
        <mobiscroll.Radio name="group">9 seconds</mobiscroll.Radio>
      </div>
    </Form>
  </mobiscroll.Page>
);

const FormikApp = withFormik({
  mapPropsToValues({ satisfied, plan, hours, worktype, locality, project }) {
    return {
      satisfied: satisfied || false,
      plan: plan || "A",
      hours: hours || 0,
      worktype: worktype,
      locality: locality,
      project: project
    };
  },
  validationSchema: yup.object().shape({
    hours: yup.number().required(),
    first: yup.string().required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      console.log(values);
      resetForm();
      setSubmitting(false);
    }, 2000);
  }
})(FormikForm);

export default FormikApp;
