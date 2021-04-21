import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';

export default function GA() {
  const { hasGeneticallyAltered } = useSelector(state => state.static);
  return (
    <Fragment>
      <h3><Snippet>playback</Snippet></h3>
      <ul>
        <li><Snippet>{`fields.ga.playback.${hasGeneticallyAltered}`}</Snippet></li>
      </ul>
    </Fragment>
  );
}
