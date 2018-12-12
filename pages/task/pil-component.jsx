import React, { Fragment } from 'react';
import moment from 'moment';
import { Snippet } from '@asl/components';
import { dateFormat, procedureDefinitions } from '../../constants';
import { connect } from 'react-redux';

const Pil = ({ profile }) => {
  const pil = profile.pil;
  return (
    <div className="govuk-grid-row">

      {/* <section id="training"> */}
      <div className="govuk-grid-column-three-quarters">
        <h2><Snippet>pil.training.title</Snippet></h2>

        { profile.certificates.length && profile.certificates.map((certificate, index) => (

          <div className="certificate" key={index}>
            <Fragment>
              <h3><Snippet>pil.training.certificate.details</Snippet></h3>
              <ul>
                <li style={{listStyleType: 'none'}}><Snippet>pil.training.certificate.number</Snippet><span>:</span>{certificate.certificateNumber}</li>
                <li style={{listStyleType: 'none'}}><Snippet>pil.training.certificate.awarded</Snippet><span>:</span>{moment(certificate.passDate, 'YYYY-MM-DD').format(dateFormat.short)}</li>
                <li style={{listStyleType: 'none'}}><Snippet>pil.training.certificate.expiry</Snippet><span>:</span>{moment(certificate.passDate, 'YYYY-MM-DD').add(5, 'years').format(dateFormat.short)}</li>
                <li style={{listStyleType: 'none'}}><Snippet>pil.training.certificate.body</Snippet><span>:</span>{certificate.accreditingBody}</li>
                <li style={{listStyleType: 'none'}}><Snippet>pil.training.certificate.file</Snippet><span>:</span></li>
              </ul>
            </Fragment>
            <Fragment>
              <h3><Snippet>pil.training.modules</Snippet></h3>
              <ul>
                { certificate.modules.map((module, index) => (
                  <li key={index}>{module.module}</li>
                )) }
              </ul>
            </Fragment>
          </div>

        )) }
        {/* </section> */}
      </div>

      {/* <section id="exemptions"> */}
      <div className="govuk-grid-column-three-quarters">
        <h2><Snippet>pil.exemptions.title</Snippet></h2>

        { profile.exemptions.length && profile.exemptions.map((exemption, index) => (
          <div className="exemption" key={index}>
            <dl>
              <dt><Snippet>pil.exemptions.module</Snippet><span>:</span></dt>
              <dd>{exemption.module}</dd>

              <dt><Snippet>pil.exemptions.reason</Snippet><span>:</span></dt>
              <dd>{exemption.description}</dd>
            </dl>
          </div>
        ))}
        {/* </section> */}
      </div>

      {/* <section id="procedures"> */}
      <div className="govuk-grid-column-three-quarters">
        <h2><Snippet>pil.procedures.title</Snippet></h2>

        <h3><Snippet>pil.procedures.categories</Snippet></h3>
        { pil.procedures.length && (
          <ul>
            { pil.procedures.map((procedure, index) => (
              <li key={index}>{`${procedure.toUpperCase()}. ${procedureDefinitions[procedure]}`}</li>
            ))}
          </ul>
        ) }
        {/* </section> */}
      </div>

    </div>
  );
};

const mapStateToProps = ({ static: { profile } }) => ({ profile });

export default connect(mapStateToProps)(Pil);
