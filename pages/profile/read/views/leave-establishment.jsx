import React, { Fragment } from 'react';
import some from 'lodash/some';
import { Link, Snippet } from '@ukhomeoffice/asl-components';

export default function LeaveEstablishment({ establishment, profile }) {
  const hasRoles = some(profile.roles, role => role.establishmentId === establishment.id);
  const hasPil = profile.pil && profile.pil.status === 'active' && profile.pil.establishmentId === establishment.id;
  const hasProjects = some(profile.projects, project => project.status === 'active' && project.establishmentId === establishment.id);

  const canLeave = !hasRoles && !hasPil && !hasProjects;

  return (
    <Fragment>
      <h3><Snippet>leaveEstablishment.title</Snippet></h3>
      <p><Snippet establishment={establishment}>{`leaveEstablishment.${canLeave ? 'content' : 'cannot-leave'}`}</Snippet></p>
      {
        canLeave && (
          <Link className="govuk-button button-warning" page="profile.remove" establishmentId={establishment.id} profileId={profile.id} label={<Snippet>leaveEstablishment.button</Snippet>} />
        )
      }
    </Fragment>
  );
}
