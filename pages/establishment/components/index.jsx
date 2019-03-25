import React, { Fragment } from 'react';
import { Snippet, Link } from '@asl/components';

export const ProfileLink = ({ type, profile }) => (
  <Fragment>
    <dt><Snippet>{type}</Snippet></dt>
    <dd><Link page="profile.view" profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} /></dd>
  </Fragment>
);
