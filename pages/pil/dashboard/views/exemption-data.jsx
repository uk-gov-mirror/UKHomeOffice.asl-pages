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
              <div className="govuk-grid-column-two-thirds">
                <dl className="exemption">
                  <dt><Snippet>certificate.exemption</Snippet>:</dt>
                  <dd>
                    <ul className="modules">
                      {
                        exemption.modules.map((module, key) => (
                          <li key={key}>
                            {module.module}
                            {module.exemption_description}
                          </li>
                        ))
                      }
                    </ul>
                  </dd>
                </dl>
              </div>
              <div className="govuk-grid-column-one-third">
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
            label={<Snippet>actions.add</Snippet>}
          />
        }
      </Fragment>
    );
  }

}

export default ExemptionData;
