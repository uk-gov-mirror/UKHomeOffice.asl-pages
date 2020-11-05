import React from 'react';
import uniq from 'lodash/uniq';
import concat from 'lodash/concat';

const groupSpeciesDetails = version => {
  return (version.protocols || []).reduce((species, protocol) => {
    if (protocol && protocol.speciesDetails && protocol.speciesDetails.length > 0) {
      protocol.speciesDetails.map(details => {
        const existingSpecies = species.find(s => s.value === details.value);

        if (existingSpecies) {
          existingSpecies.maximumAnimals += parseInt(details['maximum-animals'], 10);
          existingSpecies.lifeStages = uniq(concat(existingSpecies.lifeStages, details['life-stages']));
        } else {
          species.push({
            value: details.value,
            name: details.name,
            lifeStages: details['life-stages'],
            maximumAnimals: parseInt(details['maximum-animals'], 10)
          });
        }
      });
    }
    return species;
  }, []);
};

export default function SpeciesTable({ version }) {
  const speciesDetails = groupSpeciesDetails(version);

  if (speciesDetails.length < 1) {
    return <p><em>No data available</em></p>;
  }

  return (
    <table className="govuk-table animal-types">
      <thead>
        <tr>
          <th>Animal types</th>
          <th>Life stages</th>
        </tr>
      </thead>
      <tbody>
        {
          speciesDetails.map(species => (
            <tr key={species.value}>
              <td>{species.name}</td>
              <td>{(species.lifeStages || []).join(', ')}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
