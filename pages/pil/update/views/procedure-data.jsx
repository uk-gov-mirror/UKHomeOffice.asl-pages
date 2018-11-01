import React, { Component, Fragment } from 'react';
import Link from '../../../common/views/containers/link';
import Snippet from '../../../common/views/containers/snippet';

const hasProcedures = pil => pil.procedures && pil.procedures.length > 0;

class ProcedureData extends Component {

  render() {
    const { pil } = this.props;

    return (
      <Fragment>
        {
          hasProcedures(pil) && pil.procedures.map(procedure => (
            <div key={procedure} className="govuk-grid-row section-data">
              <div className="govuk-grid-column-three-quarters">
                <dl className="procedure">
                  <dt><Snippet>procedure.category</Snippet><span>:</span></dt>
                  <dd>{ procedure }</dd>

                  {
                    procedure === 'D' && (
                      <Fragment>
                        <dt><Snippet>procedure.catDLabel</Snippet><span>:</span></dt>
                        <dd>{pil.notesCatD}</dd>
                      </Fragment>
                    )
                  }
                  {
                    procedure === 'F' && (
                      <Fragment>
                        <dt><Snippet>procedure.catFLabel</Snippet><span>:</span></dt>
                        <dd>{pil.notesCatF}</dd>
                      </Fragment>
                    )
                  }
                </dl>
              </div>
            </div>
          )
          )
        }
        {
          hasProcedures(pil) &&
            <Link
              page="pil.procedures"
              label={<Snippet>actions.edit</Snippet>}
            />
        }
      </Fragment>
    );
  }
}

export default ProcedureData;
