import express from 'express';
const patientsRouter = express.Router();

import patientsService from '../services/patientsService';
import { toNewPatient } from '../utils';

patientsRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitivePatients());
});

patientsRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  const patient = patientsService.getPatientById(id);
  if (!patient) {
    return res.status(400).send('Patient does not exist.');
  }
  return res.send(patientsService.getPatientById(id));
});

patientsRouter.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err) {
    const result = err as Error;
    res.status(400).send(result.message);
  }
});

patientsRouter.post('/:id/entries', (req, res) => {
  try {
    const { id } = req.params;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newEntry = req.body;
    const addedEntry = patientsService.addEntry(newEntry, id);
    res.json(addedEntry);
  } catch (err) {
    const result = err as Error;
    res.status(400).send(result.message);
  }
});

export default patientsRouter;
