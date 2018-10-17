import React, { Component, Fragment } from 'react';
import Link from '../../../common/views/containers/link';
import Snippet from '../../../common/views/containers/snippet';

const hasProcedures = pil => pil.procedures && pil.procedures.length > 0;

class ProcedureData extends Component {

  render() {
    const { establishment, profile, pil } = this.props;

    return (
      <Fragment>
        {
          hasProcedures(pil) && pil.procedures.map(procedure => (
            <div key={procedure} className="govuk-grid-row section-data">
              <div className="govuk-grid-column-three-quarters">
                <dl className="procedure">
                  <dt><Snippet>procedure.category</Snippet>:</dt>
                  <dd>{ procedure }</dd>

                  {
                    procedure === 'D' && (
                      <Fragment>
                        <dt><Snippet>procedure.catDLabel</Snippet></dt>
                        <dd>{pil.notesCatD}</dd>
                      </Fragment>
                    )
                  }
                  {
                    procedure === 'F' && (
                      <Fragment>
                        <dt><Snippet>procedure.catFLabel</Snippet></dt>
                        <dd>{pil.notesCatF}</dd>
                      </Fragment>
                    )
                  }
                </dl>
              </div>
              <div className="govuk-grid-column-one-quarter">
                <ul className="actions">
                  <li>
                    <Link
                      page="pil.procedures"
                      establishment={ establishment.id }
                      pil={ pil.id }
                      profile={profile.id}
                      label={<Snippet>actions.remove</Snippet>}
                    />
                  </li>
                </ul>
              </div>
            </div>
          )
          )
        }
        {
          hasProcedures(pil) &&
            <Link
              page="pil.procedures"
              establishment={ establishment.id }
              pil={ pil.id }
              profile={profile.id}
              label={<Snippet>actions.edit</Snippet>}
            />
        }
      </Fragment>
    );
  }
}

export default ProcedureData;
