import React from 'react';
import { useSelector } from 'react-redux';
import {
  StickyNavAnchor,
  Snippet,
  Diff,
  DiffText,
  Conditions
} from '@asl/components';
import { hasChanged } from '../../../../../lib/utils';
import establishmentSchema from '../../../../establishment/update/schema';
import NamedPeople from '../../../../establishment/components/named-people';
import formatters from '../../../../establishment/formatters';
import Authorisations from '../../../../establishment/update/views/authorisations';
import isEmpty from 'lodash/isEmpty';

function legalPersonFrom(value) {
  return value.corporateStatus === 'corporate' ? {
    legalName: value.legalName,
    legalPhone: value.legalPhone,
    legalEmail: value.legalEmail
  } : undefined;
}

export default function Establishment({ task, values }) {
  const { establishment, allowedActions, openTask, errors } = useSelector(state => state.static);
  const isComplete = !task.isOpen;
  const canUpdateConditions = allowedActions.includes('establishment.updateConditions');
  const taskData = task.data.data;

  if (!taskData.conditions && taskData.conditions !== '') {
    taskData.conditions = establishment.conditions;
  }

  const diffValues = {
    ...values,
    legalPerson: legalPersonFrom(values)
  };
  const diffTaskValues = {
    ...taskData,
    legalPerson: legalPersonFrom(taskData)
  };

  const legalPersonSchemaProperties = values.corporateStatus === 'corporate' || taskData.corporateStatus === 'corporate' ? {
    legalPerson: {}
  } : {};

  const nprcSchemaProperties = values.nprc || taskData.nprc ? {
    nprc: {}
  } : {};

  const pelhSchemaProperties = values.pelh || taskData.pelh ? {
    pelh: {}
  } : {};

  return [
    (
      task.type === 'application' && (
        <StickyNavAnchor id="approved-areas" key="approved-areas">
          <h2><Snippet>sticky-nav.approved-areas</Snippet></h2>
          <dl className="inline">
            <dt><Snippet>approvedAreas.total</Snippet></dt>
            <dd>{establishment.placesCount}</dd>
          </dl>
        </StickyNavAnchor>
      )
    ),

    (
      task.type === 'application' && (
        <StickyNavAnchor id="named-people" key="named-people">
          <h2><Snippet>sticky-nav.named-people</Snippet></h2>
          <NamedPeople establishment={establishment} />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="diff" key="diff">
          <h2><Snippet>sticky-nav.diff</Snippet></h2>
          <Diff
            before={diffValues}
            after={diffTaskValues}
            schema={{ ...establishmentSchema([]), isTrainingEstablishment: {}, ...legalPersonSchemaProperties, ...nprcSchemaProperties, ...pelhSchemaProperties }}
            formatters={formatters(establishment.profiles)}
            comparator={hasChanged}
            currentLabel={isComplete ? <Snippet>diff.previous</Snippet> : undefined}
            proposedLabel={isComplete ? <Snippet>diff.changed-to</Snippet> : undefined}
          />

          <div className="sticky-nav-anchor">
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
          </div>

          <Authorisations
            before={values}
            after={taskData}
            currentTitle={isComplete && <Snippet>authorisations.previous</Snippet>}
            proposedTitle={isComplete && <Snippet>authorisations.new</Snippet>}
          />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update-conditions' && (
        <StickyNavAnchor id="conditions" key="conditions">
          <h2><Snippet>sticky-nav.conditions</Snippet></h2>
          <DiffText
            oldValue={values.conditions}
            newValue={taskData.conditions}
            currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
            proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
          />
        </StickyNavAnchor>
      )
    )
  ];
}
