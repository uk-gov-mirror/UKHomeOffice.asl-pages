import React, { Fragment, useState, useEffect } from 'react';
import isUndefined from 'lodash/isUndefined';
import omit from 'lodash/omit';
import { useSelector, shallowEqual } from 'react-redux';
import {
  Diff,
  Snippet,
  Field,
  EditableField,
  StickyNavAnchor,
  ModelSummary,
  Link
} from '@asl/components';
import { baseSchema } from '../../../../place/schema';
import formatters from '../../../../place/formatters';
import { hasChanged } from '../../../../../lib/utils';

const LicenceHolder = ({ type, profile, establishment }) => (
  <Fragment>
    <dt><Snippet>{type}</Snippet></dt>
    <dd>
      <Link
        page="profile.read"
        establishmentId={establishment.id}
        profileId={profile.id}
        label={`${profile.firstName} ${profile.lastName}`}
      />
    </dd>
  </Fragment>
);

const selector = ({ model, static: { establishment, isAsru } }) => ({ establishment, isAsru, model });

export default function Playback({ task, values, allowSubmit }) {
  const { model, establishment, isAsru } = useSelector(selector, shallowEqual);
  const [dirty, setDirty] = useState(false);
  const nopes = ['recalled-by-applicant', 'discarded-by-applicant'];
  const actionableNextSteps = task.nextSteps.filter(step => !nopes.includes(step.id));
  const canEditRestictions = isAsru && !!actionableNextSteps.length;
  const placeSchema = baseSchema();
  const diffSchema = task.onlyRolesChanged ? placeSchema : omit(placeSchema, 'nacwos', 'nvssqps');

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
    <StickyNavAnchor id="details" key="details">
      <h2><Snippet>sticky-nav.details</Snippet></h2>
      <dl className="inline">
        <dt><Snippet>establishment</Snippet></dt>
        <dd>
          <Link
            page="establishment.dashboard"
            establishmentId={establishment.id}
            label={establishment.name}
          />
        </dd>

        <dt><Snippet>licenceNumber</Snippet></dt>
        <dd>{ establishment.licenceNumber }</dd>
        {
          establishment.pelh && <LicenceHolder type="pelh" establishment={establishment} profile={establishment.pelh} />
        }
        {
          establishment.nprc && <LicenceHolder type="nprc" establishment={establishment} profile={establishment.nprc} />
        }
      </dl>
    </StickyNavAnchor>,

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="diff" key="diff">
          <h2><Snippet>sticky-nav.diff</Snippet></h2>
          <Diff
            after={task.data.data}
            before={values}
            schema={diffSchema}
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
    )
  ];
}
