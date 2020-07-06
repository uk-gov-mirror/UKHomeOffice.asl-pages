import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import some from 'lodash/some';
import { ApplyChanges, Snippet } from '@asl/components';

export default function LeaveEstablishment({ establishment, profile }) {
  const leaveUrl = establishment.leaveUrl || useSelector(state => state.static.leaveUrl);
  const hasRoles = some(profile.roles, role => role.establishmentId === establishment.id);
  const hasPil = profile.pil && profile.pil.status === 'active' && profile.pil.establishmentId === establishment.id;
  const hasProjects = some(profile.projects, project => project.status === 'active' && project.establishmentId === establishment.id);

  const canLeave = !hasRoles && !hasPil && !hasProjects;

  return (
    <Fragment>
      <h2><Snippet>leaveEstablishment.title</Snippet></h2>
      <p><Snippet establishment={establishment}>{`leaveEstablishment.${canLeave ? 'content' : 'cannot-leave'}`}</Snippet></p>
      {
        canLeave && (
          <ApplyChanges type="form" method="POST" action={leaveUrl}>
            <button className="govuk-button button-warning">
              <Snippet>leaveEstablishment.button</Snippet>
            </button>
          </ApplyChanges>
        )
      }
    </Fragment>
  );
}
