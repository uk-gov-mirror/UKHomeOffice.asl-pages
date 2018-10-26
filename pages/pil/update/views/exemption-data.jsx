import React, { Component, Fragment } from 'react';
import Link from '../../../common/views/containers/link';
import ApplyChanges from '../../../common/views/components/apply-changes';
import Snippet from '../../../common/views/containers/snippet';

class ExemptionData extends Component {

  render() {
    const { profile, skipExemptions, url } = this.props;
    return (
      <Fragment>
        {
          profile.exemptions && profile.exemptions.map((exemption, index) => (
            <div key={index} className="govuk-grid-row section-data">
              <div className="govuk-grid-column-three-quarters">
                <dl className="exemption">
                  <dt><Snippet>certificate.exemption</Snippet><span>:</span></dt>
                  <dd>{ exemption.modules[0].module }</dd>

                  <dt><Snippet>certificate.reason</Snippet></dt>
                  <dd>{ exemption.exemptionDescription }<span>:</span></dd>
                </dl>
              </div>
              <div className="govuk-grid-column-one-quarter">
                <ul className="actions">
                  <li>
                    <ApplyChanges
                      type="form"
                      action={`${url}/exemptions/${exemption.id}?action=delete&referrer=${url}`}
                      method='POST'
                    >
                      <button type="submit" className="link">
                        <span><Snippet>actions.remove</Snippet></span>
                      </button>
                    </ApplyChanges>
                  </li>
                </ul>
              </div>
            </div>
          ))
        }
        {
          skipExemptions &&
          <div className="govuk-grid-row section-data">
            <div className="govuk-grid-column-three-quarters">
              <p><Snippet>exemption.skipped</Snippet></p>
            </div>
            <div className="govuk-grid-column-one-quarter">
              <ul className="actions">
                <li>
                  <Link page="pil.exemptions.exempt" label={<Snippet>actions.edit</Snippet>} />
                </li>
              </ul>
            </div>
          </div>
        }
        {
          profile.exemptions.length > 0 &&
          <Link page="pil.exemptions.modules" label={<Snippet>{profile.exemptions.length ? 'actions.edit' : 'actions.add'}</Snippet>} />
        }
      </Fragment>
    );
  }

}

export default ExemptionData;
