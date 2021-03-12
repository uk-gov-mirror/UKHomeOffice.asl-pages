import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet } from '@asl/components';

export default function GA() {
  const project = useSelector(state => state.static.project);
  const ga = get(project, 'granted.data.ga', false);
  return (
    <Fragment>
      <h3><Snippet>playback</Snippet></h3>
      <p><Snippet>{`fields.ga.playback.${ga}`}</Snippet></p>
    </Fragment>
  );
}
