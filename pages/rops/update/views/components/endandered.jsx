import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet } from '@asl/components';

export default function Endangered() {
  const project = useSelector(state => state.static.project);
  const endangered = get(project, 'granted.data.endangered-animals', false);
  return (
    <Fragment>
      <h3><Snippet>playback</Snippet></h3>
      <p><Snippet>{`fields.endangered.playback.${endangered}`}</Snippet></p>
    </Fragment>
  );
}
