import React, { Component, Fragment } from 'react';
import Link from '../../../common/views/containers/link';
import Snippet from '../../../common/views/containers/snippet';

class ExemptionData extends Component {

  render() {
    const { establishment, pil, profile } = this.props;
    // const nbsp = '\xa0';

    return (
      <Fragment>
        {
          profile.exemptions && profile.exemptions.map(certificate => (
            <div key={certificate.hash} className="govuk-grid-row section-data">
              <div className="govuk-grid-column-two-thirds">
                <dl className="certificate">
                  <dt><Snippet>certificate.exemption</Snippet>:</dt>
                  <dd>
                    <ul className="modules">
                      {
                        certificate.modules.map((module, key) => (
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
                      <input type="hidden" name="trainingModuleId" value={certificate.id} />
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
