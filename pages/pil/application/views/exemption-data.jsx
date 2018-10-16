import React, { Component, Fragment } from 'react';
import Link from '../../../common/views/containers/link';
import Snippet from '../../../common/views/containers/snippet';

class ExemptionData extends Component {

  render() {
    const { establishment, pil, profile } = this.props;
    return (
      <Fragment>
        {
          profile.exemptions && profile.exemptions.map(exemption => (
            <div key={exemption.hash} className="govuk-grid-row section-data">
              <div className="govuk-grid-column-three-quarters">
                <dl className="exemption">
                  <dt><Snippet>certificate.exemption</Snippet>:</dt>
                  <dd>{ exemption.modules[0].module }</dd>

                  <dt><Snippet>certificate.reason</Snippet></dt>
                  <dd>{ exemption.exemptionDescription }</dd>
                </dl>
              </div>
              <div className="govuk-grid-column-one-quarter">
                <ul className="actions">
                  <li>
                    <form method="POST" noValidate>
                      <input type="hidden" name="trainingModuleId" value={exemption.id} />
                      <input type="hidden" name="action" value="delete" />
                      <button type="submit" className="link"><span><Snippet>actions.remove</Snippet></span></button>
                    </form>
                  </li>
                </ul>
              </div>
            </div>
          ))
        }
        {
          profile.exemptions.length > 0 &&
          <Link
            path="exemptions/modules"
            establishment={ establishment.id }
            pil={ pil }
            profile={profile.id}
            label={<Snippet>{profile.exemptions.length ? 'actions.edit' : 'actions.add'}</Snippet>}
          />
        }
      </Fragment>
    );
  }

}

export default ExemptionData;
