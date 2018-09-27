import React, { Component, Fragment } from 'react';
import Link from '../../../common/views/containers/link';
import Snippet from '../../../common/views/containers/snippet';

class TrainingData extends Component {

  render() {
    const { establishment, pil, profile } = this.props;
    const nbsp = '\xa0';

    return (
      <Fragment>
        {
          profile.certificates && profile.certificates.map(certificate => (
            <div key={certificate.hash} className="govuk-grid-row section-data">
              <div className="govuk-grid-column-two-thirds">
                <dl>
                  <dt><Snippet>certificate.number</Snippet>:</dt>
                  <dd>{certificate.certificate_number || nbsp}</dd>

                  <dt><Snippet>certificate.accreditation</Snippet>:</dt>
                  <dd>{certificate.accrediting_body || nbsp}</dd>

                  <dt><Snippet>certificate.awarded</Snippet>:</dt>
                  <dd>{certificate.pass_date || nbsp}</dd>

                  <dt><Snippet>certificate.modules</Snippet>:</dt>
                  <dd>
                    <ul>
                      {
                        certificate.modules.map(module => (
                          <li key={module.id}>{module.name}</li>
                        ))
                      }
                    </ul>
                  </dd>
                </dl>
              </div>
              <div className="govuk-grid-column-one-third">
                <ul className="actions">
                  <li>
                    {/* <Link label={<Snippet>links.remove</Snippet>} /> */}
                  </li>
                </ul>
              </div>
            </div>
          ))
        }
        {
          profile.certificates.length > 0 &&
          <Link
            page="pil.training"
            establishment={ establishment.id }
            pil={ pil }
            profile={profile.id}
            label={<Snippet>links.add</Snippet>}
          />
        }
      </Fragment>
    );
  }

}

export default TrainingData;
