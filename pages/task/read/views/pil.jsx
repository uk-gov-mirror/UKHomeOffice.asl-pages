import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Snippet, StickyNavPage, StickyNavAnchor, Link } from '@asl/components';
import { dateFormat } from '../../../../constants';
import { procedureDefinitions } from '../../../pil/content';
import format from 'date-fns/format';

const getNtcoStatus = status => status === 'with-ntco' ? 'status-ntco' : 'status';

const Pil = ({ profile, formFields, task, children }) => {
  const pil = profile.pil;
  const formatDate = date => format(date, dateFormat.short);

  return (
    <StickyNavPage>

      { children }

      <StickyNavAnchor id="applicant">
        <h2><Snippet>sticky-nav.applicant</Snippet></h2>
        <p><Link page="profile.view" establishmentId={task.data.establishmentId} profileId={profile.id} label={profile.name} /></p>
        <dl>
          <dt><Snippet>pil.applicant.dob</Snippet><span>:</span></dt>
          <dd>{profile.dob ? format(profile.dob, dateFormat.short) : <Snippet>pil.applicant.missingDob</Snippet>}</dd>
        </dl>
      </StickyNavAnchor>

      <StickyNavAnchor id="procedures">
        <h2><Snippet>sticky-nav.procedures</Snippet></h2>
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

      <StickyNavAnchor id="training">
        <h2><Snippet>sticky-nav.training</Snippet></h2>
        {
          profile.certificates.length > 0
            ? profile.certificates.map((certificate, index) => (
              <div key={index}>
                <h3><Snippet>pil.training.certificate.details</Snippet></h3>
                <p><Snippet>pil.training.certificate.number</Snippet><span>:</span> {certificate.certificateNumber}</p>
                <p><Snippet>pil.training.certificate.awarded</Snippet><span>:</span> {formatDate(certificate.passDate)}</p>
                <p><Snippet>pil.training.certificate.body</Snippet><span>:</span> {certificate.accreditingBody}</p>

                <h3><Snippet>pil.training.modules</Snippet></h3>
                <ul>
                  { certificate.modules.map((module, index) => (
                    <Fragment key={index}>
                      <li>{module.module}</li>
                      {
                        module.species && !!module.species.length && (
                          <ul>
                            {
                              module.species.map((s, index) =>
                                <li key={index}>{s}</li>
                              )
                            }
                          </ul>
                        )
                      }
                    </Fragment>
                  )) }
                </ul>
              </div>
            ))
            : <p><em><Snippet>pil.training.none</Snippet></em></p>
        }
      </StickyNavAnchor>

      <StickyNavAnchor id="exemptions">
        <h2><Snippet>sticky-nav.exemptions</Snippet></h2>
        {
          (profile.exemptions && !!profile.exemptions.length)
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

      {
        !!task.nextSteps.length && (
          <StickyNavAnchor id={getNtcoStatus(task.status)}>
            <h2><Snippet>{`sticky-nav.${getNtcoStatus(task.status)}`}</Snippet></h2>
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
