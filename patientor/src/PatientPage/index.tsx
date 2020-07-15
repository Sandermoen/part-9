import React, { Fragment } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  Container,
  Header,
  Icon,
  Loader,
  Card,
  Button,
} from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Patient, Entry } from '../types';
import { addEntry } from '../state/reducer';

import EntryDetails from '../components/EntryDetails';
import AddEntryFormModal from '../AddEntryFormModal';
import { EntryFormValues } from '../AddEntryFormModal/AddEntryForm';

const PatientPage: React.FC = () => {
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();
  const patient = state.patients[id];

  const openModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (entry: EntryFormValues) => {
    try {
      const response = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        entry
      );
      dispatch(addEntry(response.data, id));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      if ((patient && !patient.ssn) || !patient) {
        try {
          const patient = await axios.get<Patient>(
            `${apiBaseUrl}/patients/${id}`
          );
          dispatch({ type: 'ADD_PATIENT', payload: patient.data });
        } catch (e) {
          console.error(e);
        }
      }
    };
    fetchPatient();
  }, [dispatch, id]);

  return !patient ? (
    <Loader />
  ) : (
    <Container>
      <AddEntryFormModal
        modalOpen={modalOpen}
        error={error}
        onClose={closeModal}
        onSubmit={submitNewEntry}
      />
      <Header as="h1">
        {patient.name}{' '}
        {patient.gender !== 'other' && (
          <Icon as="i" name={patient.gender === 'female' ? 'venus' : 'mars'} />
        )}
      </Header>
      <h4>ssn: {patient.ssn}</h4>
      <h4>Occupation: {patient.occupation}</h4>
      <Header as="h3">Entries</Header>
      <Button onClick={() => openModal()}>Add New Entry</Button>
      {patient.entries && patient.entries.length > 0 ? (
        <Card.Group>
          {patient.entries?.map((entry) => (
            <Fragment key={entry.id}>
              <EntryDetails entry={entry} />
            </Fragment>
          ))}
        </Card.Group>
      ) : (
        <h3>No entries on recod.</h3>
      )}
    </Container>
  );
};

export default PatientPage;
