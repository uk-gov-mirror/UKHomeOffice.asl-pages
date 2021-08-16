import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';
import ReviewField from '@asl/projects/client/components/review-field';

export default function Species() {
  const { schemaVersion } = useSelector(state => state.model.project);
  const { hasOtherSpecies, projectSpecies } = useSelector(state => state.static);

  if (schemaVersion === 0 || hasOtherSpecies) {
    return null;
  }

  return (
    <Fragment>
      <h3><Snippet>fields.species.playback</Snippet></h3>
      <ReviewField
        project={{ species: projectSpecies }}
        type="species-selector"
      />
    </Fragment>
  );
}
