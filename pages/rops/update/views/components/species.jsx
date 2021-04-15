import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet } from '@asl/components';
import ReviewField from '@asl/projects/client/components/review-field';

export default function Species() {
  const project = useSelector(state => state.static.project);
  const data = project.granted.data;

  const hasOtherSpecies = (get(data, 'species-other') || []).length ||
    (get(data, 'species') || []).find(s => s.includes('other'));

  if (project.schemaVersion === 0 || hasOtherSpecies) {
    return null;
  }

  return (
    <Fragment>
      <h3><Snippet>playback</Snippet></h3>
      <p><Snippet>fields.species.playback</Snippet></p>
      <ReviewField
        project={{ species: data.species }}
        type="species-selector"
      />
    </Fragment>
  );
}
