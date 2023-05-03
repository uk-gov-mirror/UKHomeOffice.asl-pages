import React, { Fragment } from 'react';
import { Snippet } from '@ukhomeoffice/asl-components';

export default function RegulatorySubpurposes() {
  return (
    <Fragment>
      <h3><Snippet>purpose.title</Snippet></h3>
      <ul>
        <li>Regulatory use and routine production</li>
      </ul>
    </Fragment>
  );
}
