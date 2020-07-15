import React, { Fragment } from 'react';

import { CoursePart } from './types';

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const renderPart = () => {
    switch (part.name) {
      case 'Fundamentals': {
        return (
          <div>
            <p>Name: {part.name}</p>
            <p>Description: {part.description}</p>
            <p>Exercise Count: {part.exerciseCount}</p>
          </div>
        );
      }
      case 'Using props to pass data': {
        return (
          <div>
            <p>Name: {part.name}</p>
            <p>Group Project Count: {part.groupProjectCount}</p>
            <p>Exercise Count: {part.exerciseCount}</p>
          </div>
        );
      }
      case 'Deeper type usage': {
        return (
          <div>
            <p>Name: {part.name}</p>
            <p>Description {part.description}</p>
            <p>Exercise Count: {part.exerciseCount}</p>
            <p>Exercise Submission Link: {part.exerciseSubmissionLink}</p>
          </div>
        );
      }
      case 'Custom course part': {
        return (
          <div>
            <p>Name: {part.name}</p>
            <p>Description: {part.description}</p>
            <p>Exercise Count: {part.exerciseCount}</p>
            <p>Credits: {part.credits}</p>
          </div>
        );
      }
      default:
        return assertNever(part);
    }
  };

  return <Fragment>{renderPart()}</Fragment>;
};

export default Part;
