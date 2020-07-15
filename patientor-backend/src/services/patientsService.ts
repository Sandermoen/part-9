import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';

import {
  Patient,
  NonSensitivePatient,
  NewPatient,
  NewEntry,
  Entry,
} from '../types';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ ssn, entries, ...patient }) => patient);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatientById = (id: string): Patient | undefined => {
  return patients.find((patient) => patient.id === id);
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = {
    id: uuidv4(),
    ...entry,
  };
  patients.find((patient) => {
    if (patient.id === id) {
      patient.entries = [...patient.entries, newEntry];
      return true;
    }
    return false;
  });
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
};
