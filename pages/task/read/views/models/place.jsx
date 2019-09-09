import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Diff,
  Snippet,
  Field,
  StickyNavAnchor,
  ModelSummary
} from '@asl/components';
import { schema as placeSchema } from '../../../../place/schema';
import formatters from '../../../../place/formatters';
import { hasChanged } from '../../../../../lib/utils';

const LicenceHolder = ({ type, profile }) => (
  <Fragment>
    <dt><Snippet>{type}</Snippet></dt>
    <dd>{`${profile.firstName} ${profile.lastName}`}</dd>
  </Fragment>
);

const selector = ({ static: { establishment, isAsru } }) => ({ establishment, isAsru });

export default function Playback({ task, schema, values }) {
  const { establishment, isAsru } = useSelector(selector, shallowEqual);

  return [
    <StickyNavAnchor id="details" key="details">
      <h2><Snippet>sticky-nav.details</Snippet></h2>
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

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="diff" key="diff">
          <h2><Snippet>sticky-nav.diff</Snippet></h2>
          <Diff values={task.data.data} model={values} schema={placeSchema} formatters={formatters} comparator={hasChanged} />
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
      values && values.restrictions && (
        <StickyNavAnchor id="restrictions" key="restrictions">
          <Field
            editable={isAsru && !!task.nextSteps.length && !task.data.data.restrictions}
            name="restrictions"
            title={<Snippet>sticky-nav.restrictions</Snippet>}
            content={values.restrictions}
          />
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
      task.data.data.restrictions && (
        <StickyNavAnchor id="new-restrictions" key="new-restrictions">
          <Field
            editable={isAsru && !!task.nextSteps.length}
            name="restrictions"
            title={<Snippet>sticky-nav.new-restrictions</Snippet>}
            content={task.data.data.restrictions}
          />
        </StickyNavAnchor>
      )
    )
  ];
}
