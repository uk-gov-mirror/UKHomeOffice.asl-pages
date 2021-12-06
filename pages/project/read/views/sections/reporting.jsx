import React, { Fragment } from 'react';
import Rops from '../components/rops';
import RA from '../components/retrospective-assessment';

export default function Reporting() {
  return (
    <Fragment>
      <Rops />
      <RA />
    </Fragment>
  );
}
