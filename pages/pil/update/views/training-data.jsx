import React, { Component, Fragment } from 'react';
import Link from '../../../common/views/containers/link';
import Snippet from '../../../common/views/containers/snippet';

class TrainingData extends Component {

  render() {
    const { profile, url } = this.props;
    const nbsp = '\xa0';

    return (
      <Fragment>
        {
          profile.trainingModules && profile.trainingModules.map((certificate, index) => (
            <div key={index} className="govuk-grid-row section-data">
              <div className="govuk-grid-column-three-quarters">
                <dl className="certificate">
                  <dt><Snippet>certificate.number</Snippet><span>:</span></dt>
                  <dd>{certificate.certificateNumber || nbsp}</dd>

                  <dt><Snippet>certificate.accreditation</Snippet><span>:</span></dt>
                  <dd>{certificate.accreditingBody || nbsp}</dd>

                  <dt><Snippet>certificate.awarded</Snippet><span>:</span></dt>
                  <dd>{certificate.passDate || nbsp}</dd>

                  <dt><Snippet>certificate.modules</Snippet><span>:</span></dt>
                  <dd>
                    <ul className="modules">
                      {
                        certificate.modules.map((module, key) => (
                          <li key={key}>
                            {module.module}
                            {module.species.length > 0 && <span className="species"> ({module.species.join(', ')})</span>}
                          </li>
                        ))
                      }
                    </ul>
                  </dd>
                </dl>
              </div>
              <div className="govuk-grid-column-one-quarter">
                <ul className="actions">
                  <li>
                    <a href={`${url}/training/${certificate.id}/delete?referrer=${url}`}><Snippet>actions.remove</Snippet></a>
                  </li>
                </ul>
              </div>
            </div>
          ))
        }
        {
          profile.trainingModules.length > 0 &&
          <Link
            path="training"
            label={<Snippet>actions.add</Snippet>}
          />
        }
      </Fragment>
    );
  }

}

export default TrainingData;
