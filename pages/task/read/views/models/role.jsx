import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  StickyNavAnchor,
  Snippet,
  Link
} from '@asl/components';
import LicenceHolder from '../../../../common/components/licence-holder';

const selector = ({ static: { establishment, profile } }) => ({ establishment, profile });

export default function Role({ task, values, schema }) {
  const { establishment, profile } = useSelector(selector, shallowEqual);

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
      <Link page="profile.view" establishmentId={establishment.id} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} />
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
          <dl>
            <dt><Snippet>fields.role.label</Snippet></dt>
            <dd><Snippet>{`namedRoles.${values.type}`}</Snippet></dd>
          </dl>
        </StickyNavAnchor>
      )
    )
  ];
}
