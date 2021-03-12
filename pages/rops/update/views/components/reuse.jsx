import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet } from '@asl/components';

export default function Reuse() {
  const project = useSelector(state => state.static.project);
  const reuse = get(project, 'granted.data.reuse', false);
  return (
    <Fragment>
      <h3><Snippet>playback</Snippet></h3>
      <p><Snippet>{`fields.reuse.playback.${reuse}`}</Snippet></p>
    </Fragment>
  );
}
