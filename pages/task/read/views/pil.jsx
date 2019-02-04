import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Snippet, StickyNavPage, StickyNavAnchor } from '@asl/components';
import { dateFormat, procedureDefinitions } from '../../../../constants';
import format from 'date-fns/format';
import addYears from 'date-fns/add_years';

const Pil = ({ profile, formFields, task }) => {
  const pil = profile.pil;
  const formatDate = date => format(date, dateFormat.short);
  return (
    <StickyNavPage>
      <StickyNavAnchor id="training">
        <h2><Snippet>pil.training.title</Snippet></h2>
        {
          profile.certificates.length > 0
            ? profile.certificates.map((certificate, index) => (
              <div key={index}>
                <Fragment>
                  <h3><Snippet>pil.training.certificate.details</Snippet></h3>
                  <p><Snippet>pil.training.certificate.number</Snippet><span>:</span> {certificate.certificateNumber}</p>
                  <p><Snippet>pil.training.certificate.awarded</Snippet><span>:</span> {formatDate(certificate.passDate)}</p>
                  <p><Snippet>pil.training.certificate.expiry</Snippet><span>:</span> {formatDate(addYears(certificate.passDate, 5))}</p>
                  <p><Snippet>pil.training.certificate.body</Snippet><span>:</span> {certificate.accreditingBody}</p>
                  <p></p><Snippet>pil.training.certificate.file</Snippet><span>:</span> <br/>
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
            ))
            : <p><em><Snippet>pil.training.none</Snippet></em></p>
        }
      </StickyNavAnchor>

      <StickyNavAnchor id="exemptions">
        <h2><Snippet>pil.exemptions.title</Snippet></h2>
        {
          profile.exemptions.length > 0
            ? profile.exemptions.map((exemption, index) => (
              <div key={index}>
                <dl>
                  <dt><Snippet>pil.exemptions.module</Snippet><span>:</span></dt>
                  <dd>{exemption.module}</dd>

                  <dt><Snippet>pil.exemptions.reason</Snippet><span>:</span></dt>
                  <dd>{exemption.description}</dd>
                </dl>
              </div>
            ))
            : <p><em><Snippet>pil.exemptions.none</Snippet></em></p>
        }
      </StickyNavAnchor>

      <StickyNavAnchor id="procedures">
        <h2><Snippet>pil.procedures.title</Snippet></h2>
        {
          pil.procedures.length > 0
            ? (
              <Fragment>
                <h3><Snippet>pil.procedures.categories</Snippet></h3>
                { pil.procedures.map((procedure, index) => (
                  <p key={index}>{`${procedure.toUpperCase()}. ${procedureDefinitions[procedure]}`}</p>
                ))}
              </Fragment>
            )
            : <p><em><Snippet>pil.procedures.none</Snippet></em></p>
        }
      </StickyNavAnchor>

      {
        !!task.nextSteps.length && (
          <StickyNavAnchor id="status">
            <h2><Snippet>sticky-nav.status</Snippet></h2>
            {
              formFields
            }
          </StickyNavAnchor>
        )
      }
    </StickyNavPage>
  );
};

const mapStateToProps = ({ static: { profile } }) => ({ profile });

export default connect(mapStateToProps)(Pil);
