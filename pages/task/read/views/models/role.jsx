import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  StickyNavAnchor,
  Snippet,
  Link, Conditions
} from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';
import isEmpty from 'lodash/isEmpty';

const selector = ({ static: { establishment, profile, remainingRoles, allowedActions, openTask, errors } }) => ({ establishment, profile, remainingRoles, allowedActions, openTask, errors });

export default function Role({ task, values, schema }) {
  const { establishment, profile, remainingRoles, allowedActions, openTask, errors } = useSelector(selector, shallowEqual);
  const canUpdateConditions = allowedActions.includes('establishment.updateConditions');
  const taskData = task.data.data;

  return [
    (
      task.data.action === 'create' && (
        <StickyNavAnchor id="role" key="role">
          <h2><Snippet>sticky-nav.role</Snippet></h2>
          <dl className="inline">
            <dt><Snippet>fields.role.label</Snippet></dt>
            <dd><Snippet>{`namedRoles.${task.data.data.type}`}</Snippet></dd>
            <dt><Snippet>action.assigned</Snippet></dt>
            <dd>
              <Link page="profile.read" establishmentId={establishment.id} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} />
            </dd>
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
      task.data.action === 'replace' && (
        <StickyNavAnchor id="role" key="role">
          <h2><Snippet>sticky-nav.role</Snippet></h2>
          <table className="govuk-table">
            <thead>
              <tr>
                <th></th>
                <th><Snippet>diff.current</Snippet></th>
                <th><Snippet>diff.proposed</Snippet></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  PELH or NRPC
                </td>
                <td>{task.data.data.replaceProfile.firstName} {task.data.data.replaceProfile.lastName}</td>
                <td><span className="highlight">{`${profile.firstName} ${profile.lastName}`}</span></td>
              </tr>
            </tbody>
          </table>
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'delete' && (
        <StickyNavAnchor id="role" key="role">
          <h2><Snippet>sticky-nav.role</Snippet></h2>
          <dl className="inline">
            <dt><Snippet>fields.role.label</Snippet></dt>
            <dd><Snippet>{`namedRoles.${values.type}`}</Snippet></dd>
            <dt><Snippet>action.removed</Snippet></dt>
            <dd>
              <Link page="profile.read" establishmentId={establishment.id} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} />
            </dd>
            {
              remainingRoles !== 'BC_NO_DATA' && (remainingRoles || []).length > 0 &&
                <Fragment>
                  <dt><Snippet>remaining.some</Snippet></dt>
                  <dd>
                    <ul>
                      {
                        remainingRoles.map(role => (
                          <li key={role.id}>{`${role.profile.firstName} ${role.profile.lastName}`}</li>
                        ))
                      }
                    </ul>
                  </dd>
                </Fragment>
            }
          </dl>
          {
            remainingRoles !== 'BC_NO_DATA' && (remainingRoles || []).length === 0 &&
              <Warning><Snippet>remaining.none</Snippet></Warning>
          }
        </StickyNavAnchor>
      )
    ),
    (
      <StickyNavAnchor id="conditions" key="conditions">
        <h2><Snippet>conditions.title</Snippet></h2>
        <Conditions
          conditions={taskData.conditions ? taskData.conditions : establishment.conditions }
          reminders={taskData.reminder && taskData.reminder !== '' ? [JSON.parse(taskData.reminder)] : establishment.reminders}
          label={<Snippet>conditions.hasConditions</Snippet>}
          noConditionsLabel={<Snippet>conditions.noConditions</Snippet>}
          canUpdate={canUpdateConditions && !openTask}
          editing={!isEmpty(errors)}
          taskData={taskData}
          isComplete={!task.isOpen}
        >
        </Conditions>
      </StickyNavAnchor>
    )
  ];
}
