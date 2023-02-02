import React, { useState, useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Diff,
  Snippet,
  Field,
  EditableField,
  StickyNavAnchor,
  ModelSummary, Conditions
} from '@asl/components';
import { baseSchema } from '../../../../place/schema';
import formatters from '../../../../place/formatters';
import { hasChanged } from '../../../../../lib/utils';
import isEmpty from 'lodash/isEmpty';

const selector = ({ model, static: { establishment, isAsru, allowedActions, openTask, errors } }) => ({ establishment, isAsru, model, allowedActions, openTask, errors });

export default function Playback({ task, values, allowSubmit }) {
  const { model, isAsru, allowedActions, openTask, establishment, errors } = useSelector(selector, shallowEqual);
  const [dirty, setDirty] = useState(false);
  const nopes = ['recalled-by-applicant', 'discarded-by-applicant'];
  const actionableNextSteps = task.nextSteps.filter(step => !nopes.includes(step.id));
  const canEditRestictions = isAsru && !!actionableNextSteps.length;
  const placeSchema = baseSchema();
  const canUpdateConditions = allowedActions.includes('establishment.updateConditions');
  const taskData = task.data.data;

  if (!taskData.conditions && taskData.conditions !== '') {
    taskData.conditions = establishment.conditions;
  }

  const isComplete = !task.isOpen;

  useEffect(() => {
    if (dirty && !allowSubmit) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
    return () => {
      window.onbeforeunload = null;
    };
  }, [dirty, allowSubmit]);

  return [
    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="diff" key="diff">
          <h2><Snippet>sticky-nav.diff</Snippet></h2>
          <Diff
            after={task.data.data}
            before={values}
            schema={placeSchema}
            formatters={formatters}
            comparator={hasChanged}
            currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
            proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
          />
        </StickyNavAnchor>
      )
    ),

    (
      (task.data.action === 'create' || task.data.action === 'delete') && (
        <StickyNavAnchor id={task.data.action} key={task.data.action}>
          <h2><Snippet>{`sticky-nav.${task.data.action}`}</Snippet></h2>
          <ModelSummary formatters={formatters} model={task.data.action === 'delete' ? values : task.data.data} schema={placeSchema} />
        </StickyNavAnchor>
      )
    ),

    (
      (task.data.meta && task.data.meta.changesToRestrictions) && (
        <StickyNavAnchor id="changes-to-restrictions" key="changes-to-restrictions">
          <Field
            title={<Snippet>sticky-nav.changes-to-restrictions</Snippet>}
            content={task.data.meta.changesToRestrictions}
          />
        </StickyNavAnchor>
      )
    ),

    (
      <StickyNavAnchor id="restrictions" key="restrictions">
        <EditableField
          currentLabel={
            isComplete
              ? <Snippet>fields.restrictions.previousLabel</Snippet>
              : <Snippet>fields.restrictions.currentLabel</Snippet>
          }
          proposedLabel={
            isComplete
              ? <Snippet>fields.restrictions.newLabel</Snippet>
              : <Snippet>fields.restrictions.proposedLabel</Snippet>
          }
          deleteItemWarning="Are you sure you want to remove these restrictions?"
          editable={canEditRestictions}
          label={<Snippet>sticky-nav.restrictions</Snippet>}
          name="restrictions"
          format={val => val || 'None'}
          original={values && values.restrictions}
          proposed={!isUndefined(model.restrictions) ? model.restrictions : task.data.data.restrictions}
          setDirty={setDirty}
        />
      </StickyNavAnchor>
    ),
    (
      <StickyNavAnchor id="conditions" key="conditions">
        <h2><Snippet>conditions.title</Snippet></h2>
        <Conditions
          conditions={taskData.conditions}
          reminders={taskData.reminder && taskData.reminder !== '' ? [JSON.parse(taskData.reminder)] : establishment.reminders}
          label={<Snippet>conditions.hasConditions</Snippet>}
          noConditionsLabel={<Snippet>conditions.noConditions</Snippet>}
          canUpdate={canUpdateConditions && !openTask}
          editing={!isEmpty(errors)}
          taskData={taskData}
          isComplete={isComplete}
        >
        </Conditions>
      </StickyNavAnchor>
    )
  ];
}
