import React from 'react';
import {
  Snippet,
  StickyNavAnchor,
  Link,
  DiffText,
  TrainingSummary
} from '@ukhomeoffice/asl-components';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import ProceduresDiff from '../../../../pil/procedures/views/diff';
import SpeciesDiff from '../../../../pil/species/views/diff';

function PilProcedures({ task }) {
  const action = get(task, 'data.action');
  const pil = get(task, 'data.modelData');
  const data = get(task, 'data.data');
  const isReview = action === 'review';
  const showDiff = !isReview && !['suspension', 'reinstatement'].includes(task.type);

  const catEs = get(pil, 'profile.trainingPils', []).map(p => ({ ...p, key: 'E' }));

  const fromModelData = sortBy((pil.procedures || []).map(p => (p.key ? p : { key: p })).concat(catEs), 'key');
  const fromData = sortBy((data.procedures || []).map(p => (p.key ? p : { key: p })).concat(catEs), 'key');

  return <ProceduresDiff
    before={showDiff && fromModelData}
    after={showDiff ? fromData : fromModelData}
    beforePil={pil}
    afterPil={showDiff ? data : pil}
  />;
}

export default function PIL({ task, values }) {
  const isTransfer = task.type === 'transfer';
  const isReview = task.type === 'review';
  const isUpdateConditions = task.data.action === 'update-conditions';
  const certificates = task.data.certificates || [];
  const showTraining = !isReview || certificates.length > 0;

  const isComplete = !task.isOpen;
  let pil = isUpdateConditions ? values : task.data.data;
  if (isReview) {
    pil = task.data.modelData;
  }

  const navAnchors = [];

  if (isTransfer) {
    navAnchors.push(
      <StickyNavAnchor id="establishment" key="establishment">
        <h2><Snippet>{`sticky-nav.${isTransfer ? 'transfer' : 'establishment'}`}</Snippet></h2>
        <table className="govuk-table compare">
          <thead>
            <tr>
              <th><Snippet>pil.establishment.current</Snippet></th>
              <th><Snippet>pil.establishment.proposed</Snippet></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link
                  page="establishment.dashboard"
                  establishmentId={pil.establishment.from.id}
                  label={pil.establishment.from.name}
                />
              </td>
              <td>
                <span className="highlight">
                  <Link
                    page="establishment.dashboard"
                    establishmentId={pil.establishment.to.id}
                    label={pil.establishment.to.name}
                  />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </StickyNavAnchor>
    );
  }

  if (isUpdateConditions) {
    navAnchors.push(
      <StickyNavAnchor id="conditions" key="conditions">
        <h2><Snippet>sticky-nav.conditions</Snippet></h2>
        <DiffText
          oldValue={pil.conditions}
          newValue={task.data.data.conditions}
          currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
          proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
        />
      </StickyNavAnchor>
    );
  } else {
    navAnchors.push([
      <StickyNavAnchor id="procedures" key="procedures">
        <h2><Snippet>sticky-nav.procedures</Snippet></h2>
        <PilProcedures task={task} />
      </StickyNavAnchor>,

      <StickyNavAnchor id="species" key="species">
        <h2><Snippet>sticky-nav.species</Snippet></h2>
        <SpeciesDiff before={task.data.modelData} after={task.data.data} taskType={task.type} />
      </StickyNavAnchor>,

      showTraining && (
        <StickyNavAnchor id="training" key="training">
          <h2><Snippet>sticky-nav.training</Snippet></h2>
          <TrainingSummary certificates={certificates} />
        </StickyNavAnchor>
      )
    ]);
  }

  return navAnchors;
}
