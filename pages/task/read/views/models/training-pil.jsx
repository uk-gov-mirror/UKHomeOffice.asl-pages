import React, { Fragment } from 'react';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import ProceduresDiff from '../../../../pil/procedures/views/diff';
import differenceInYears from 'date-fns/difference_in_years';
import { StickyNavAnchor, Snippet } from '@asl/components';
import TrainingPilView from '../../../../pil/unscoped/courses/participants/read/views/training-pil';

export function PilProcedures({ task, isPil = false }) {
  const revocation = task.data.action === 'revoke';

  const trainingCourse = get(task, 'data.modelData.trainingCourse');
  const pil = get(task, 'data.modelData.profile.pil');
  const profileCatEs = get(task, 'data.modelData.profile.trainingPils', []);

  const noPil = !pil || pil.status !== 'active' || !pil.procedures || !pil.procedures.length;
  const singleRevocation = revocation && noPil && profileCatEs.length === 1;
  const singleAddition = !revocation && noPil && profileCatEs.length === 0;

  if (singleRevocation || singleAddition) {
    const data = revocation ? profileCatEs[0] : { ...task.data.data, trainingCourse };
    return <TrainingPilView trainingPil={data} />;
  }

  let before = ((pil && pil.status === 'active' && pil.procedures) || [])
    .map(p => ({ key: p }))
    .concat(profileCatEs.map(p => ({ ...p, key: 'E' })));

  if (!revocation) {
    before = before.filter(p => p.id !== task.data.id);
  }

  const after = revocation
    ? before.filter(p => p.id !== task.data.id)
    : before.concat({ ...task.data.data, trainingCourse, key: 'E' });

  return (
    <Fragment>
      <h3>Categories</h3>
      <ProceduresDiff before={sortBy(before, 'key')} after={sortBy(after, 'key')} />
    </Fragment>
  );
}

export default function TrainingPil({ task }) {
  const data = task.data.data;
  const profile = get(task, 'data.modelData.profile');
  const pil = profile.pil;
  const over18 = profile.dob ? differenceInYears(new Date(), new Date(profile.dob)) >= 18 : 'unknown';

  const establishment = pil ? pil.establishment : get(task, 'data.establishment');

  const action = task.data.action;

  return [
    <StickyNavAnchor id="establishment" key="establishment">
      <h2><Snippet>sticky-nav.establishment</Snippet></h2>
      <p className="gutter">{establishment.name}</p>
    </StickyNavAnchor>,

    <StickyNavAnchor id="applicant" key="applicant">
      <h2><Snippet>sticky-nav.applicant</Snippet></h2>
      <p className="gutter">{`${profile.firstName} ${profile.lastName}`}</p>
      <dl>
        <dt><Snippet>applicant-over-18</Snippet></dt>
        <dd>
          {
            over18 === 'unknown'
              ? <Snippet>pil.applicant.missingDob</Snippet>
              : over18 ? 'Yes' : 'No'
          }
        </dd>
      </dl>
    </StickyNavAnchor>,

    <StickyNavAnchor id="procedures" key="procedures">
      <div className="gutter">
        <h2><Snippet>sticky-nav.procedures</Snippet></h2>
        <PilProcedures task={task} />
      </div>
    </StickyNavAnchor>,

    (
      action === 'grant' && (
        <StickyNavAnchor id="training-need" key="training-need">
          <h2><Snippet>sticky-nav.training-need</Snippet></h2>
          <p className="gutter">{ data.trainingNeed }</p>
        </StickyNavAnchor>
      )
    )
  ];
}
