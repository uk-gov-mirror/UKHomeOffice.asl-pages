import React from 'react';
import concat from 'lodash/concat';
import flatten from 'lodash/flatten';
import values from 'lodash/values';
import { projectSpecies as SPECIES } from '@ukhomeoffice/asl-constants';

const speciesLabels = flatten(values(SPECIES));

const getSpeciesLabel = speciesKey => {
  const species = speciesLabels.find(s => s.value === speciesKey);
  return species ? species.label : speciesKey;
};

const getSpeciesCount = (speciesKey, version) => version[`reduction-quantities-${speciesKey}`] || 'No answer provided';

function SpeciesCountItem({ speciesKey, version }) {
  if (speciesKey.startsWith('other-')) {
    const subSpeciesList = version[`species-${speciesKey}`] ?? [];

    if (subSpeciesList.length === 0) {
      return null;
    }

    return <li>
      {getSpeciesLabel(speciesKey)}:
      <ul>
        {subSpeciesList.map(otherSpecies =>
          <SpeciesCountItem key={otherSpecies} speciesKey={otherSpecies} version={version} />
        )}
      </ul>
    </li>;
  } else {
    return <li>
      {getSpeciesLabel(speciesKey)}: {getSpeciesCount(speciesKey, version)}
    </li>;
  }
}

export default function SpeciesCount({ version }) {
  const speciesUsed = concat([], version.species, version['species-other']).filter(Boolean);

  if (speciesUsed.length < 1) {
    return <p><em>No data available</em></p>;
  }

  return (
    <ul>
      {
        speciesUsed.map(species => (
          <SpeciesCountItem key={species} speciesKey={species} version={version} />
        ))
      }
    </ul>
  );
}
