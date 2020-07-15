import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { HospitalEntry as Entry } from '../types';
import { useStateValue } from '../state';

const HospitalEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Icon name="user doctor" size="large" style={{ float: 'right' }} />
        <Card.Header>{entry.date}</Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Card color="green">
          <Card.Content>
            <Card.Header>Discharge</Card.Header>
            <Card.Description>{entry.discharge.criteria}</Card.Description>
            <Card.Description>{entry.discharge.date}</Card.Description>
          </Card.Content>
        </Card>
        <ul>
          {entry.diagnosisCodes?.map((code) => (
            <li key={code}>
              {code}{' '}
              {diagnoses.map((diagnose) => {
                if (diagnose.code === code) {
                  return <span key={code}>{diagnose.name}</span>;
                }
                return null;
              })}
            </li>
          ))}
        </ul>
      </Card.Content>
    </Card>
  );
};

export default HospitalEntry;
