import React, { Fragment } from 'react';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import { Field, Formik, Form } from 'formik';

import { Entry, DistributiveOmit } from '../types';
import { useStateValue } from '../state';

import {
  DiagnosisSelection,
  TextField,
  NumberField,
} from '../AddPatientModal/FormField';

export type EntryFormValues = DistributiveOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const [type, setType] = React.useState('Hospital');
  let initialValues;

  switch (type) {
    case 'OccupationalHealthcare': {
      initialValues = {
        type: 'OccupationalHealthcare',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        employerName: '',
        sickLeave: {
          startDate: '',
          endDate: '',
        },
      } as EntryFormValues;
      break;
    }
    case 'HealthCheck': {
      initialValues = {
        type: 'HealthCheck',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        healthCheckRating: 0,
      } as EntryFormValues;
      break;
    }
    default: {
      initialValues = {
        type: 'Hospital',
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
        discharge: {
          date: '',
          criteria: '',
        },
      } as EntryFormValues;
    }
  }

  const renderFields = () => {
    switch (type) {
      case 'OccupationalHealthcare': {
        return (
          <Fragment>
            <Field
              label="Employer name"
              placeholder="Employer name"
              name="employerName"
              component={TextField}
            />
            <h3>Sick Leave</h3>
            <Field
              label="Start date"
              placeholder="Start date"
              name="sickLeave.startDate"
              component={TextField}
            />
            <Field
              label="End date"
              placeholder="End date"
              name="sickLeave.endDate"
              component={TextField}
            />
          </Fragment>
        );
      }
      case 'HealthCheck': {
        return (
          <Field
            label="Health check rating"
            placeholder="End date"
            name="healthCheckRating"
            component={NumberField}
            min={0}
            max={3}
          />
        );
      }
      default: {
        return (
          <Fragment>
            <h3>Discharge</h3>
            <Field
              label="Discharge date"
              placeholder="Discharge date"
              name="discharge.date"
              component={TextField}
            />
            <Field
              label="Discharge criteria"
              placeholder="Discharge criteria"
              name="discharge.criteria"
              component={TextField}
            />
          </Fragment>
        );
      }
    }
  };

  console.log(initialValues);

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Dropdown
              placeholder="Select Friend"
              fluid
              selection
              options={[
                { value: 'Hospital', key: 'Hospital', text: 'Hospital' },
                {
                  value: 'OccupationalHealthcare',
                  key: 'OccupationalHealthcare',
                  text: 'Occupational Healthcare',
                },
                {
                  value: 'HealthCheck',
                  key: 'HealthCheck',
                  text: 'Health Check',
                },
              ]}
              defaultValue="Hospital"
              onChange={(_event, data) =>
                data.value && setType(data.value.toString())
              }
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="Date"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            {renderFields()}
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
