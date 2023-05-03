import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@ukhomeoffice/asl-components';

export default function NMBAs() {
  const nmbas = useSelector(state => state.static.hasNMBAs);

  const isLegacy = useSelector(state => state.model.project.schemaVersion === 0);

  if (isLegacy) {
    return null;
  }

  return (
    <Fragment>
      <h3><Snippet>playback</Snippet></h3>
      <ul>
        <li><Snippet>{`fields.nmbas.playback.${nmbas}`}</Snippet></li>
      </ul>
    </Fragment>
  );
}
