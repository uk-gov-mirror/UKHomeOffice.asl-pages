import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';

export default function Endangered() {
  const endangered = useSelector(state => state.static.hasEndangeredSpecies);
  return (
    <Fragment>
      <h3><Snippet>playback</Snippet></h3>
      <ul>
        <li><Snippet>{`fields.endangered.playback.${endangered}`}</Snippet></li>
      </ul>
    </Fragment>
  );
}
