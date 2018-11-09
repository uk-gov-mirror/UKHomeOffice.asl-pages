import React, { Component } from 'react';
import moment from 'moment';
import Snippet from '../containers/snippet';
import { dateFormat, procedureDefinitions } from '../../../../constants';

class Pil extends Component {
  render() {
    const { pil, profile } = this.props;

    return (
      <div className="pil">

        <section id="training">
          <h2><Snippet>pil.training.title</Snippet></h2>

          { profile.certificates.length && profile.certificates.map((certificate, index) => (

            <div className="certificate" key={index}>
              <h3><Snippet>pil.training.certificate.details</Snippet></h3>
              <dl>
                <dt><Snippet>pil.training.certificate.number</Snippet><span>:</span></dt>
                <dd>{certificate.certificateNumber}</dd>

                <dt><Snippet>pil.training.certificate.awarded</Snippet><span>:</span></dt>
                <dd>{moment(certificate.passDate, 'YYYY-MM-DD').format(dateFormat.short)}</dd>

                <dt><Snippet>pil.training.certificate.expiry</Snippet><span>:</span></dt>
                <dd>{moment(certificate.passDate, 'YYYY-MM-DD').add(5, 'years').format(dateFormat.short)}</dd>

                <dt><Snippet>pil.training.certificate.body</Snippet><span>:</span></dt>
                <dd>{certificate.accreditingBody}</dd>

                <dt><Snippet>pil.training.certificate.file</Snippet><span>:</span></dt>
                <dd></dd>
              </dl>

              <h3><Snippet>pil.training.modules</Snippet></h3>
              <ul>
                { certificate.modules.map((module, index) => (
                  <li key={index}>{module.module}</li>
                )) }
              </ul>
            </div>

          )) }
        </section>

        <section id="exemptions">
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
        </section>

        <section id="procedures">
          <h2><Snippet>pil.procedures.title</Snippet></h2>

          <h3><Snippet>pil.procedures.categories</Snippet></h3>
          { pil.procedures.length && (
            <ul>
              { pil.procedures.map((procedure, index) => (
                <li key={index}>{`${procedure.toUpperCase()}. ${procedureDefinitions[procedure]}`}</li>
              ))}
            </ul>
          ) }
        </section>

      </div>
    );
  }
}

export default Pil;
