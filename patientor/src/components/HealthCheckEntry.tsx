import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import { HealthCheckEntry as Entry } from '../types';
import { useStateValue } from '../state';

const HealthCheckEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card>
      <Card.Content>
        <Icon name="user doctor" size="large" style={{ float: 'right' }} />
        <Card.Header>{entry.date}</Card.Header>
        <Card.Description>{entry.description}</Card.Description>
        <Icon
          name="heart"
          size="large"
          color={
            entry.healthCheckRating === 0
              ? 'green'
              : entry.healthCheckRating === 1
              ? 'yellow'
              : entry.healthCheckRating === 2
              ? 'orange'
              : 'red'
          }
        />
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

export default HealthCheckEntry;
