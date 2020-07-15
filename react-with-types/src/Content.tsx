import React, { Fragment } from 'react';

import Part from './Part';

import { CoursePart } from './types';

const Content: React.FC<{ courseParts: Array<CoursePart> }> = ({
  courseParts,
}) => (
  <Fragment>
    {courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
  </Fragment>
);

export default Content;
