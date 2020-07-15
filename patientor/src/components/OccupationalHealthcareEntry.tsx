import React from 'react';
import { Card, Icon, Header } from 'semantic-ui-react';

import { OccupationalHealthcareEntry as Entry } from '../types';
import { useStateValue } from '../state';

const OccupationalHealthcareEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Icon name="wrench" size="large" style={{ float: 'right' }} />
        <Card.Header>{entry.date}</Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Header as="h4">
          <Icon name="suitcase" />
          {entry.employerName}
        </Header>
        {entry.sickLeave && (
          <Card color="yellow">
            <Card.Content>
              <Card.Header>Sick Leave</Card.Header>
              <Card.Description>
                Start Date: {entry.sickLeave?.startDate}
              </Card.Description>
              <Card.Description>
                End Date: {entry.sickLeave.endDate}
              </Card.Description>
            </Card.Content>
          </Card>
        )}
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

export default OccupationalHealthcareEntry;
