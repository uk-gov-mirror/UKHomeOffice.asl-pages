import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import classnames from 'classnames';
import {
  Details,
  StickyNavPage,
  StickyNavAnchor,
  Snippet,
  Field,
  Inset,
  Link
} from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';
import Establishment from './establishment';
import PIL from './pil';
import Place from './place';
import Profile from './profile';
import Project from './project';
import Role from './role';
import Rop from './rop';
import TrainingPil from './training-pil';

import TaskStatus from '../components/task-status';
import ActivityLog from '../components/activity-log';

const models = {
  establishment: Establishment,
  pil: PIL,
  place: Place,
  profile: Profile,
  project: Project,
  rop: Rop,
  role: Role,
  trainingPil: TrainingPil
};

const selector = ({ static: { schema, values } }) => ({ schema, values });

const AsruDiscard = ({ task, showBorder }) => {
  return (
    <Details
      className={classnames('asru-discard-task', { border: showBorder })}
      summary={<Snippet>asruDiscardTask.summary</Snippet>}
    >
      <Inset>
        <p><Snippet>asruDiscardTask.details</Snippet></p>
        <Link
          page="task.read.discard"
          taskId={task.id}
          label={<Snippet>asruDiscardTask.action</Snippet>}
          className="govuk-button button-warning"
        />
      </Inset>
    </Details>
  );
};

export default function Model({ task, formFields, allowSubmit }) {
  const { schema, values } = useSelector(selector, shallowEqual);
  const endorsingOwnPil = useSelector(state => state.static.endorsingOwnPil);
  const Model = models[task.data.model];
  const hasComments = task.data.meta && task.data.meta.comments;

  const hasNextSteps = task.nextSteps.length > 0;
  const hasTaskOptions = schema.status.options.length > 0;
  const canBeDiscardedByAsru = task.nextSteps.find(step => step.id === 'discarded-by-asru');

  return (
    <StickyNavPage>
      <StickyNavAnchor id="status">
        <TaskStatus task={task} />
      </StickyNavAnchor>

      <StickyNavAnchor id="activity">
        <ActivityLog task={task} />
      </StickyNavAnchor>
      {
        Model({ task, schema, values, allowSubmit })
      }
      {
        hasComments && (
          <StickyNavAnchor id={`comments.${task.type}`}>
            <Field
              title={<Snippet fallback="sticky-nav.comments.default">{`sticky-nav.comments.${task.type}`}</Snippet>}
              content={task.data.meta.comments}
            />
          </StickyNavAnchor>
        )
      }
      {
        hasNextSteps &&
          <StickyNavAnchor id="next-steps">
            <h2><Snippet>sticky-nav.next-steps</Snippet></h2>
            <p><Snippet>make-decision.hint</Snippet></p>
            {
              endorsingOwnPil && <Warning><Snippet>warning.ntcoOwnPil</Snippet></Warning>
            }
            { hasTaskOptions && formFields }
            {
              canBeDiscardedByAsru && <AsruDiscard task={task} showBorder={hasTaskOptions} />
            }
          </StickyNavAnchor>
      }
    </StickyNavPage>
  );
}
