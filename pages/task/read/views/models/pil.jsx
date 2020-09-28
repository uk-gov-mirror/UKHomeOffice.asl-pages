import React from 'react';
import { useSelector } from 'react-redux';
import differenceInYears from 'date-fns/difference_in_years';
import {
  Snippet,
  StickyNavAnchor,
  Link,
  DiffText,
  TrainingSummary
} from '@asl/components';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import ProceduresDiff from '../../../../pil/procedures/views/diff';
import SpeciesDiff from '../../../../pil/species/views/diff';

function PilProcedures({ task }) {
  const action = get(task, 'data.action');
  const pil = get(task, 'data.modelData');
  const data = get(task, 'data.data');
  const isReview = action === 'review';

  const catEs = pil.profile.trainingPils.map(p => ({ ...p, key: 'E' }));

  const fromModelData = sortBy((pil.procedures || []).map(p => ({ key: p })).concat(catEs), 'key');
  const fromData = sortBy((data.procedures || []).map(p => ({ key: p })).concat(catEs), 'key');

  return <ProceduresDiff before={!isReview && fromModelData} after={isReview ? fromModelData : fromData} beforePil={pil} afterPil={isReview ? pil : data} />;
}

export default function PIL({ task, values }) {
  const profile = useSelector(state => state.static.profile);
  const establishment = useSelector(state => state.static.establishment);
  const over18 = profile.dob ? differenceInYears(new Date(), new Date(profile.dob)) >= 18 : 'unknown';
  const isTransfer = task.type === 'transfer';
  const isReview = task.type === 'review';
  const certificates = task.data.certificates || [];
  const showTraining = !isReview || certificates.length > 0;

  const isComplete = !task.isOpen;

  let pil = task.data.action === 'update-conditions' ? values : task.data.data;
  if (isReview) {
    pil = task.data.modelData;
  }

  const applicantKey = `applicant.${task.type === 'application' ? 'application' : 'other'}`;

  return [
    <StickyNavAnchor id="establishment" key="establishment">
      <h2><Snippet>{`sticky-nav.${isTransfer ? 'transfer' : 'establishment'}`}</Snippet></h2>
      {
        isTransfer &&
          <table className="govuk-table compare">
            <thead>
              <tr>
                <th><Snippet>pil.establishment.current</Snippet></th>
                <th><Snippet>pil.establishment.proposed</Snippet></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pil.establishment.from.name}</td>
                <td><span className="highlight">{pil.establishment.to.name}</span></td>
              </tr>
            </tbody>
          </table>
      }
      {
        !isTransfer && <p>{establishment.name}</p>
      }
    </StickyNavAnchor>,

    <StickyNavAnchor id={applicantKey} key={applicantKey}>
      <h2><Snippet>{`sticky-nav.${applicantKey}`}</Snippet></h2>
      <p><Link page="profile.read" establishmentId={task.data.establishmentId} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} /></p>
      {
        task.type === 'application' && <dl>
          <dt><Snippet>pil.applicant.over18</Snippet></dt>
          <dd>{
            over18 === 'unknown'
              ? <Snippet>pil.applicant.missingDob</Snippet>
              : over18 === true ? 'Yes' : 'No'
          }</dd>
        </dl>
      }
    </StickyNavAnchor>,

    <StickyNavAnchor id="procedures" key="procedures">
      <h2><Snippet>sticky-nav.procedures</Snippet></h2>
      <PilProcedures task={task} />
    </StickyNavAnchor>,

    <StickyNavAnchor id="species" key="species">
      <h2><Snippet>sticky-nav.species</Snippet></h2>
      <SpeciesDiff before={task.data.modelData} after={task.data.data} taskType={task.type} />
    </StickyNavAnchor>,

    (
      showTraining && (
        <StickyNavAnchor id="training" key="training">
          <h2><Snippet>sticky-nav.training</Snippet></h2>
          <TrainingSummary certificates={certificates} />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update-conditions' && (
        <StickyNavAnchor id="conditions" key="conditions">
          <h2><Snippet>sticky-nav.conditions</Snippet></h2>
          <DiffText
            oldValue={pil.conditions}
            newValue={task.data.data.conditions}
            currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
            proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
          />
        </StickyNavAnchor>
      )
    )
  ];
}
