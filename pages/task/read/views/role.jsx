import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { StickyNavPage, StickyNavAnchor, Snippet, Link, Field } from '@asl/components';
import LicenceHolder from '../../../common/components/licence-holder';
import MakeDecision from './make-decision';
import WithdrawApplication from './withdraw-application';

const Role = ({ establishment, profile, task, values, children, schema }) => (
  <StickyNavPage>

    { children }

    <StickyNavAnchor id="establishment">
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
    </StickyNavAnchor>
    <StickyNavAnchor id="applicant">
      <h2><Snippet>sticky-nav.applicant</Snippet></h2>
      <Link page="profile.view" establishmentId={establishment.id} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} />
    </StickyNavAnchor>
    {
      task.data.action === 'create' && (
        <StickyNavAnchor id="role">
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
    }
    {
      task.data.action === 'delete' && (
        <StickyNavAnchor id="role">
          <h2><Snippet>sticky-nav.role</Snippet></h2>
          <dl>
            <dt><Snippet>fields.role.label</Snippet></dt>
            <dd><Snippet>{`namedRoles.${values.type}`}</Snippet></dd>
          </dl>
        </StickyNavAnchor>
      )
    }
    {
      (task.data.meta && task.data.meta.comment) && (
        <StickyNavAnchor id="comments">
          <Field
            title={<Snippet>sticky-nav.comments</Snippet>}
            content={task.data.meta.comment}
          />
        </StickyNavAnchor>
      )
    }

    {
      schema.status.options.length > 0 &&
        <StickyNavAnchor id="status">
          <h2><Snippet>sticky-nav.status</Snippet></h2>
          <p><Snippet>make-decision.hint</Snippet></p>
          <MakeDecision />
          { task.canBeWithdrawn && <WithdrawApplication showHeading /> }
        </StickyNavAnchor>
    }

    {
      // if the only option is to withdraw, display the withdraw button
      schema.status.options.length === 0 && task.canBeWithdrawn &&
        <StickyNavAnchor id="withdraw">
          <h2><Snippet>sticky-nav.withdraw</Snippet></h2>
          <WithdrawApplication />
        </StickyNavAnchor>
    }

  </StickyNavPage>
);

const mapStateToProps = ({ static: { establishment, profile, values, schema } }) => ({ establishment, profile, values, schema });

export default connect(mapStateToProps)(Role);
