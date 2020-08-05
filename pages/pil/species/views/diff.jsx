import React from 'react';
import { Snippet } from '@asl/components';

const Item = ({species, before, after, diffClassName = 'diff'}) => {
  const speciesChanged = before.species.includes(species) !== after.species.includes(species);
  return <li><span className={speciesChanged ? diffClassName : ''}>{species}</span></li>;
};

export default function SpeciesDiff({ before, after, isReview }) {
  // old tasks might have null species
  before.species = before.species || [];
  after.species = after.species || [];

  const isApplication = before.status === 'pending';
  const speciesBefore = before.species.sort();
  const speciesAfter = isReview ? before.species.sort() : after.species.sort();

  if (isApplication || isReview) {
    if (speciesAfter.length === 0) {
      return null;
    }

    return (
      <div className="species-diff">
        <ul>
          {
            speciesAfter.map(species => <li key={species}>{species}</li>)
          }
        </ul>
      </div>
    );
  }

  return (
    <div className="species-diff">
      <table className="govuk-table">
        <thead>
          <tr>
            <th><Snippet>diff.species.current</Snippet></th>
            <th><Snippet>diff.species.proposed</Snippet></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul className="current">
                {
                  speciesBefore.map(species =>
                    <Item
                      key={species}
                      species={species}
                      before={before}
                      after={after}
                      diffClassName="diff removed"
                    />
                  )
                }
              </ul>
            </td>
            <td>
              <ul className="proposed">
                {
                  speciesAfter.map(species =>
                    <Item
                      key={species}
                      species={species}
                      before={before}
                      after={after}
                    />
                  )
                }
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
