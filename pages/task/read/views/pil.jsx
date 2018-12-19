import React, { Fragment } from 'react';
// import moment from 'moment';
import { Snippet } from '@asl/components';
import { dateFormat, procedureDefinitions } from '../../../../constants';
import { connect } from 'react-redux';
import format from 'date-fns/format';
import addYears from 'date-fns/add_years';

const Pil = ({ profile }) => {
  const pil = profile.pil;
  const formatDate = date => format(date, dateFormat.ddMMyyyy);
  return (
    <Fragment>
      <h2><Snippet>pil.training.title</Snippet></h2>
      { profile.certificates.length && profile.certificates.map((certificate, index) => (
        <div className="certificate" key={index}>
          <Fragment>
            <h3><Snippet>pil.training.certificate.details</Snippet></h3>
            <Snippet>pil.training.certificate.number</Snippet><span>:</span> {certificate.certificateNumber}<br/>
            <Snippet>pil.training.certificate.awarded</Snippet><span>:</span> {formatDate(certificate.passDate)}<br/>
            <Snippet>pil.training.certificate.expiry</Snippet><span>:</span> {formatDate(addYears(certificate.passDate, 5))}<br/>
            <Snippet>pil.training.certificate.body</Snippet><span>:</span> {certificate.accreditingBody}<br/>
            <Snippet>pil.training.certificate.file</Snippet><span>:</span> <br/>
          </Fragment>
          <br />
          <Fragment>
            <h3><Snippet>pil.training.modules</Snippet></h3>
            <ul>
              { certificate.modules.map((module, index) => (
                <li key={index}>{module.module}</li>
              )) }
            </ul>
          </Fragment>
          <br />
        </div>
      )) }
      <hr /><br />

      <div id="exemptions">
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
        <hr /><br />
      </div>

      <div id="procedures">
        <h2><Snippet>pil.procedures.title</Snippet></h2>
        <h3><Snippet>pil.procedures.categories</Snippet></h3>
        { pil.procedures.length && (
          <Fragment>
            { pil.procedures.map((procedure, index) => (
              <p key={index}>{`${procedure.toUpperCase()}. ${procedureDefinitions[procedure]}`}</p>
            ))}
          </Fragment>
        ) }<br />
        <hr /><br />
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { profile } }) => ({ profile });

export default connect(mapStateToProps)(Pil);
