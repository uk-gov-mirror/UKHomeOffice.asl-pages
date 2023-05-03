import React, { Fragment } from 'react';
import { Snippet } from '@ukhomeoffice/asl-components';

export default function Sidebar() {
  return (
    <Fragment>
      <h3><Snippet>guidance.title</Snippet></h3>
      <p className="govuk-hint"><Snippet>guidance.hint</Snippet></p>
      <a href="https://www.gov.uk/guidance/animal-testing-and-research-annual-returns" target="_blank" rel="noreferrer"><Snippet>guidance.link</Snippet></a>
    </Fragment>
  );
}
