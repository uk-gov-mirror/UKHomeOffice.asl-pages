import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';
import ReviewField from '@asl/projects/client/components/review-field';

export default function Species() {
  const { schemaVersion } = useSelector(state => state.model.project);
  const { hasOtherSpecies, species } = useSelector(state => state.static);

  if (schemaVersion === 0 || hasOtherSpecies) {
    return null;
  }

  return (
    <Fragment>
      <h3><Snippet>playback</Snippet></h3>
      <p><Snippet>fields.species.playback</Snippet></p>
      <ReviewField
        project={{ species }}
        type="species-selector"
      />
    </Fragment>
  );
}
