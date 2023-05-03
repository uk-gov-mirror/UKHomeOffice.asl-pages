import React, { Fragment } from 'react';
import isEqual from 'lodash/isEqual';
import { Snippet, Inset, Markdown } from '@ukhomeoffice/asl-components';
import TrainingPil from '../../unscoped/courses/participants/read/views/training-pil';

const Item = ({
  procedure,
  model,
  before,
  after,
  beforePil = {},
  afterPil = {},
  diffClassName = 'diff',
  catE
}) => {
  const procedureChanged = before.map(p => p.key).includes(procedure.key) !== after.map(p => p.key).includes(procedure.key);

  const onlyNotesChanged = !procedureChanged && ['D', 'F'].includes(procedure.key) &&
    beforePil[`notesCat${procedure.key}`] !== afterPil[`notesCat${procedure.key}`];

  return (
    <li className={procedureChanged ? diffClassName : ''}>
      <strong>{`${procedure.key}. `}</strong><Snippet>{`procedureDefinitions.${procedure.key}`}</Snippet>
      {
        ['D', 'F'].includes(procedure.key) &&
          <Inset>
            <p><strong><Snippet>{`fields.notesCat${procedure.key}.label`}</Snippet></strong></p>
            <div className={onlyNotesChanged ? diffClassName : ''}>
              {model[`notesCat${procedure.key}`]}
            </div>
          </Inset>
      }
      {
        procedure.key === 'E' && (
          <TrainingPil trainingPil={procedure} />
        )
      }
    </li>
  );
};

export default function ProceduresDiff({
  before = [],
  after = [],
  beforePil = {},
  afterPil = {}
}) {
  if (!before.length && !after.length) {
    return <p>No procedures selected.</p>;
  }

  const procsChanged = !isEqual(before, after);
  const notesChanged = !isEqual(beforePil.notesCatD, afterPil.notesCatD) || !isEqual(beforePil.notesCatF, afterPil.notesCatF);
  const hasChanged = procsChanged || notesChanged;

  if (!before.length) {
    return (
      <div className="procedures-diff">
        <h4>Categories</h4>
        <ul>
          {
            after.map(procedure =>
              <li key={procedure.key}>
                <strong>{`${procedure.key}. `}</strong><Snippet>{`procedureDefinitions.${procedure.key}`}</Snippet>
                {
                  ['D', 'F'].includes(procedure.key) &&
                    <Inset>
                      <p><strong><Snippet>{`fields.notesCat${procedure.key}.label`}</Snippet></strong></p>
                      {afterPil[`notesCat${procedure.key}`]}
                    </Inset>
                }
                {
                  procedure.key === 'E' && <Fragment>
                    {
                      // some cat E pils are converted cat F
                      // these don't have any training course data but will have a note
                      procedure.trainingCourse
                        ? <TrainingPil trainingPil={procedure} />
                        : <Inset><Markdown>{ afterPil.notesCatF }</Markdown></Inset>
                    }
                  </Fragment>
                }
              </li>
            )
          }
        </ul>
      </div>
    );
  }

  return (
    <div className="procedures-diff">
      <table className="govuk-table">
        <thead>
          <tr>
            <th><Snippet>diff.procedures.current</Snippet></th>
            {
              hasChanged && <th><Snippet>diff.procedures.proposed</Snippet></th>
            }
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul className="current">
                {
                  before.map(procedure =>
                    <Item
                      key={procedure.key}
                      procedure={procedure}
                      model={beforePil}
                      before={before}
                      after={after}
                      beforePil={beforePil}
                      afterPil={afterPil}
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
                      after.map(procedure =>
                        <Item
                          key={procedure.key}
                          procedure={procedure}
                          model={afterPil}
                          before={before}
                          after={after}
                          beforePil={beforePil}
                          afterPil={afterPil}
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
