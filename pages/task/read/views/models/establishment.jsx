import React from 'react';
import { useSelector } from 'react-redux';
import {
  StickyNavAnchor,
  Snippet,
  Diff,
  DiffText
} from '@asl/components';
import { hasChanged } from '../../../../../lib/utils';
import establishmentSchema from '../../../../establishment/update/schema';
import NamedPeople from '../../../../establishment/components/named-people';
import formatters from '../../../../establishment/formatters';
import Authorisations from '../../../../establishment/update/views/authorisations';

export default function Establishment({ task, values }) {
  const establishment = useSelector(state => state.static.establishment);
  const isComplete = !task.isOpen;

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
            before={values}
            after={task.data.data}
            schema={{ ...establishmentSchema, isTrainingEstablishment: {} }}
            formatters={formatters}
            comparator={hasChanged}
            currentLabel={isComplete ? <Snippet>diff.previous</Snippet> : undefined}
            proposedLabel={isComplete ? <Snippet>diff.changed-to</Snippet> : undefined}
          />

          <Authorisations
            before={values}
            after={task.data.data}
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
            newValue={task.data.data.conditions}
            currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
            proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
          />
        </StickyNavAnchor>
      )
    )
  ];
}
