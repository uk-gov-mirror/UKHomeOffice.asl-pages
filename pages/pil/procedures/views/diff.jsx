import React, { Fragment } from 'react';
import { Snippet, Inset } from '@asl/components';

const Item = ({procedure, model, before, after, diffClassName = 'diff'}) => {
  const procedureChanged = before.procedures.includes(procedure) !== after.procedures.includes(procedure);

  const onlyNotesChanged = !procedureChanged && ['D', 'F'].includes(procedure) &&
    before[`notesCat${procedure}`] !== after[`notesCat${procedure}`];

  return (
    <li className={procedureChanged ? diffClassName : ''}>
      <Fragment>
        {`${procedure}. `}<Snippet>{`procedureDefinitions.${procedure}`}</Snippet>
        {
          ['D', 'F'].includes(procedure) &&
            <Inset className={onlyNotesChanged ? diffClassName : ''}>
              <p><strong><Snippet>{`fields.notesCat${procedure}.label`}</Snippet></strong></p>
              {model[`notesCat${procedure}`]}
            </Inset>
        }
      </Fragment>
    </li>
  );
};

export default function ProceduresDiff({ before, after, taskType }) {
  // old tasks might have null procedures
  before.procedures = before.procedures || [];
  after.procedures = after.procedures || [];

  const displayData = taskType === 'application' ? after : before;
  displayData.procedures.sort();

  if (taskType !== 'amendment') {
    if (displayData.procedures.length === 0) {
      return <p>No procedures selected.</p>;
    }

    return (
      <div className="procedures-diff">
        <h4>Categories</h4>
        <ul>
          {
            displayData.procedures.map(procedure =>
              <li key={procedure}>
                {`${procedure}. `}<Snippet>{`procedureDefinitions.${procedure}`}</Snippet>
                {
                  ['D', 'F'].includes(procedure) &&
                    <Inset>
                      <p><strong><Snippet>{`fields.notesCat${procedure}.label`}</Snippet></strong></p>
                      {displayData[`notesCat${procedure}`]}
                    </Inset>
                }
              </li>
            )
          }
        </ul>
      </div>
    );
  }

  const proceduresBefore = before.procedures.sort();
  const proceduresAfter = after.procedures.sort();

  return (
    <div className="procedures-diff">
      <table className="govuk-table">
        <thead>
          <tr>
            <th><Snippet>diff.procedures.current</Snippet></th>
            <th><Snippet>diff.procedures.proposed</Snippet></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul className="current">
                {
                  proceduresBefore.map(procedure =>
                    <Item
                      key={procedure}
                      procedure={procedure}
                      model={before}
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
                  proceduresAfter.map(procedure =>
                    <Item
                      key={procedure}
                      procedure={procedure}
                      model={after}
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
