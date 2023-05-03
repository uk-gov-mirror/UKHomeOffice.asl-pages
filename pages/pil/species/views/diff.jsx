import React from 'react';
import isEqual from 'lodash/isEqual';
import { Snippet } from '@ukhomeoffice/asl-components';

const Item = ({species, before, after, diffClassName = 'diff'}) => {
  const speciesChanged = before.species.includes(species) !== after.species.includes(species);
  return <li><span className={speciesChanged ? diffClassName : ''}>{species}</span></li>;
};

export default function SpeciesDiff({ before, after, taskType }) {
  // old tasks might have null species
  before.species = before.species || [];
  after.species = after.species || [];

  if (!before.species.length && !after.species.length) {
    return <p>No animal types selected.</p>;
  }

  const hasChanged = !isEqual(before.species.sort(), after.species.sort());

  const displayData = taskType === 'application' ? after : before;
  displayData.species.sort();

  if (taskType !== 'amendment' && taskType !== 'transfer') {
    if (displayData.species.length === 0) {
      return <p>No animal types selected.</p>;
    }

    return (
      <div className="species-diff">
        <ul>
          {
            displayData.species.map(species => <li key={species}>{species}</li>)
          }
        </ul>
      </div>
    );
  }

  const speciesBefore = before.species.sort();
  const speciesAfter = after.species.sort();

  return (
    <div className="species-diff">
      <table className="govuk-table">
        <thead>
          <tr>
            <th><Snippet>diff.species.current</Snippet></th>
            {
              hasChanged && <th><Snippet>diff.species.proposed</Snippet></th>
            }
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
            {
              hasChanged && (
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
              )
            }
          </tr>
        </tbody>
      </table>
    </div>
  );
}
