import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { StickyNavPage, StickyNavAnchor, Snippet, Link, Field } from '@asl/components';

const Role = ({ establishment, profile, task, values, formFields, children }) => (
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
          establishment.pelh && <Fragment>
            <dt><Snippet>licenceHolder</Snippet></dt>
            <dd>{ establishment.pelh.name }</dd>
          </Fragment>
        }
      </dl>
    </StickyNavAnchor>
    <StickyNavAnchor id="applicant">
      <h2><Snippet>sticky-nav.applicant</Snippet></h2>
      <Link page="profile.view" establishmentId={establishment.id} label={profile.name} />
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
      !!task.nextSteps.length && (
        <StickyNavAnchor id="status">
          <h2><Snippet>sticky-nav.status</Snippet></h2>
          {
            formFields
          }
        </StickyNavAnchor>
      )
    }
  </StickyNavPage>
);

const mapStateToProps = ({ static: { establishment, profile, values } }) => ({ establishment, profile, values });

export default connect(mapStateToProps)(Role);
