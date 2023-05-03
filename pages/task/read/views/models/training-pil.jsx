import React from 'react';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import ProceduresDiff from '../../../../pil/procedures/views/diff';
import { StickyNavAnchor, Snippet } from '@ukhomeoffice/asl-components';
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

  return <ProceduresDiff before={sortBy(before, 'key')} after={sortBy(after, 'key')} />;
}

export default function TrainingPil({ task }) {
  const data = task.data.data;
  const action = task.data.action;

  return [
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
