import React from 'react';
import concat from 'lodash/concat';
import flatten from 'lodash/flatten';
import values from 'lodash/values';
import { projectSpecies as SPECIES } from '@ukhomeoffice/asl-constants';

const speciesLabels = flatten(values(SPECIES));

const getSpeciesLabel = speciesKey => {
  const species = speciesLabels.find(s => s.value === speciesKey);
  return species ? species.label : undefined;
};

const getSpeciesCount = (speciesKey, version) => version[`reduction-quantities-${speciesKey}`] || 'No answer provided';

export default function SpeciesCount({ version }) {
  const speciesUsed = concat([], version.species, version['species-other']).filter(Boolean);

  if (speciesUsed.length < 1) {
    return <p><em>No data available</em></p>;
  }

  return (
    <ul>
      {
        speciesUsed.map(species => (
          <li key={species}>
            {getSpeciesLabel(species)}: {getSpeciesCount(species, version)}
          </li>
        ))
      }
    </ul>
  );
}
