import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSES';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: { id: string; entry: Entry };
    };

export const setPatientList = (patients: Patient[]): Action => ({
  type: 'SET_PATIENT_LIST',
  payload: patients,
});

export const addPatient = (patient: Patient): Action => ({
  type: 'ADD_PATIENT',
  payload: patient,
});

export const updatePatient = (patient: Patient): Action => ({
  type: 'UPDATE_PATIENT',
  payload: patient,
});

export const setDiagnoses = (diagnoses: Diagnosis[]): Action => ({
  type: 'SET_DIAGNOSES',
  payload: diagnoses,
});

export const addEntry = (entry: Entry, id: string): Action => ({
  type: 'ADD_ENTRY',
  payload: { id, entry },
});

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_DIAGNOSES': {
      return {
        ...state,
        diagnoses: action.payload,
      };
    }
    case 'ADD_ENTRY': {
      const { id, entry } = action.payload;
      const patient = JSON.parse(JSON.stringify(state.patients[id]));
      patient.entries.push(entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [id]: patient,
        },
      };
    }
    default:
      return state;
  }
};
