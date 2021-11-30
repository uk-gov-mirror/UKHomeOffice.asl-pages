import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  StickyNavAnchor,
  Snippet,
  Link
} from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';
import LicenceHolder from '../../../../common/components/licence-holder';

const selector = ({ static: { establishment, profile, remainingRoles } }) => ({ establishment, profile, remainingRoles });

export default function Role({ task, values, schema }) {
  const { establishment, profile, remainingRoles } = useSelector(selector, shallowEqual);

  return [
    <StickyNavAnchor id="establishment" key="establishment">
      <h2><Snippet>sticky-nav.establishment</Snippet></h2>
      <dl className="inline">
        <dt><Snippet>establishment</Snippet></dt>
        <dd>{ establishment.name }</dd>

        <dt><Snippet>licenceNumber</Snippet></dt>
        <dd>{ establishment.licenceNumber }</dd>
        {
          establishment.pelh && <LicenceHolder type="pelh" profile={establishment.pelh} />
        }
        {
          establishment.nprc && <LicenceHolder type="nprc" profile={establishment.nprc} />
        }
      </dl>
    </StickyNavAnchor>,

    <StickyNavAnchor id="applicant" key="applicant">
      <h2><Snippet>sticky-nav.applicant</Snippet></h2>
      <p className="gutter">
        <Link page="profile.read" establishmentId={establishment.id} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} />
      </p>
    </StickyNavAnchor>,

    (
      task.data.action === 'create' && (
        <StickyNavAnchor id="role" key="role">
          <h2><Snippet>sticky-nav.role</Snippet></h2>
          <dl>
            <dt><Snippet>fields.role.label</Snippet></dt>
            <dd><Snippet>{`namedRoles.${task.data.data.type}`}</Snippet></dd>
            {
              task.data.data.rcvsNumber && (
                <Fragment>
                  <dt><Snippet>fields.rcvsNumber.label</Snippet></dt>
                  <dd>{ task.data.data.rcvsNumber }</dd>
                </Fragment>
              )
            }
          </dl>
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'delete' && (
        <StickyNavAnchor id="role" key="role">
          <h2><Snippet>sticky-nav.role</Snippet></h2>
          <p><strong><Snippet>fields.role.label</Snippet></strong></p>
          <p><Snippet>{`namedRoles.${values.type}`}</Snippet></p>

          {
            remainingRoles !== 'BC_NO_DATA' && (remainingRoles || []).length > 0 &&
              <Fragment>
                <p><strong><Snippet>remaining.some</Snippet></strong></p>
                <ul>
                  {
                    remainingRoles.map(role => (
                      <li key={role.id}>{`${role.profile.firstName} ${role.profile.lastName}`}</li>
                    ))
                  }
                </ul>
              </Fragment>
          }
          {
            remainingRoles !== 'BC_NO_DATA' && (remainingRoles || []).length === 0 &&
              <Warning><Snippet>remaining.none</Snippet></Warning>
          }
        </StickyNavAnchor>
      )
    )
  ];
}
