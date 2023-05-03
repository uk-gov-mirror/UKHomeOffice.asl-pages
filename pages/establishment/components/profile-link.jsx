import React, { Fragment } from 'react';
import { Snippet, Link } from '@ukhomeoffice/asl-components';

export default function ProfileLink({ type, profile }) {
  return (
    <Fragment>
      <dt><Snippet>{type}</Snippet></dt>
      <dd><Link page="profile.read" profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} /></dd>
    </Fragment>
  );
}
