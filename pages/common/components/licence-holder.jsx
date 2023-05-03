import React, { Fragment } from 'react';
import { Snippet } from '@ukhomeoffice/asl-components';

const LicenceHolder = ({ type, profile }) => (
  <Fragment>
    <dt><Snippet>{type}</Snippet></dt>
    <dd>{`${profile.firstName} ${profile.lastName}`}</dd>
  </Fragment>
);

export default LicenceHolder;
