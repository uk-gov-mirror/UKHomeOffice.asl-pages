import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@ukhomeoffice/asl-components';
import ReviewField from '@asl/projects/client/components/review-field';

export default function Species() {
  const isLegacy = useSelector(state => state.model.project.schemaVersion === 0);
  const { hasOtherSpecies, projectSpecies } = useSelector(state => state.static);

  if (isLegacy || hasOtherSpecies) {
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
