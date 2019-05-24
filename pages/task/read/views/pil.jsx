import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Snippet, StickyNavPage, StickyNavAnchor, Link, Inset } from '@asl/components';
import { dateFormat } from '../../../../constants';
import { procedureDefinitions } from '../../../pil/content';
import format from 'date-fns/format';
import WithdrawApplication from './withdraw-application';
import MakeDecision from './make-decision';

const getNtcoStatus = status => status === 'with-ntco' ? 'status-ntco' : 'status';

const Pil = ({ profile, task, children, schema, formFields }) => {
  const pil = task.data.data;
  const formatDate = date => format(date, dateFormat.short);

  return (
    <StickyNavPage>

      { children }

      <StickyNavAnchor id="applicant">
        <h2><Snippet>sticky-nav.applicant</Snippet></h2>
        <p><Link page="profile.view" establishmentId={task.data.establishmentId} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} /></p>
        <dl>
          <dt><Snippet>pil.applicant.dob</Snippet><span>:</span></dt>
          <dd>{profile.dob ? format(profile.dob, dateFormat.short) : <Snippet>pil.applicant.missingDob</Snippet>}</dd>
        </dl>
      </StickyNavAnchor>

      <StickyNavAnchor id="procedures">
        <h2><Snippet>sticky-nav.procedures</Snippet></h2>
        {
          pil.procedures && pil.procedures.length > 0
            ? (
              <Fragment>
                <h3><Snippet>pil.procedures.categories</Snippet></h3>
                { pil.procedures.map((procedure, index) => (
                  <Fragment key={index}>
                    <p>{`${procedure.toUpperCase()}. ${procedureDefinitions[procedure]}`}</p>
                    {
                      (procedure === 'D' || procedure === 'F') && (
                        <Inset>
                          {
                            procedure === 'D' && (
                              <dl>
                                <dt><Snippet>pil.procedures.evidence</Snippet></dt>
                                <dd>
                                  {
                                    pil.notesCatD
                                      ? pil.notesCatD
                                      : <em><Snippet>pil.procedures.noEvidence</Snippet></em>
                                  }
                                </dd>
                              </dl>
                            )
                          }
                          {
                            procedure === 'F' && (
                              <dl>
                                <dt><Snippet>pil.procedures.type</Snippet></dt>
                                <dd>
                                  {
                                    pil.notesCatF
                                      ? pil.notesCatF
                                      : <em><Snippet>pil.procedures.noType</Snippet></em>
                                  }
                                </dd>
                              </dl>
                            )
                          }
                        </Inset>
                      )
                    }
                  </Fragment>
                ))}
              </Fragment>
            )
            : <p><em><Snippet>pil.procedures.none</Snippet></em></p>
        }
      </StickyNavAnchor>

      <StickyNavAnchor id="species">
        <h2><Snippet>sticky-nav.species</Snippet></h2>
        {
          pil.species && pil.species.length > 0
            ? (
              <Fragment>
                { pil.species.map((s, index) => (
                  <p key={index}>{s}</p>
                ))}
              </Fragment>
            )
            : <p><em><Snippet>pil.species.none</Snippet></em></p>
        }
      </StickyNavAnchor>

      <StickyNavAnchor id="training">
        <h2><Snippet>sticky-nav.training</Snippet></h2>
        {
          profile.certificates && profile.certificates.length > 0
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
          profile.exemptions && profile.exemptions.length > 0
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
        schema.status.options.length > 0 &&
          <StickyNavAnchor id={getNtcoStatus(task.status)}>
            <h2><Snippet type={task.type}>{`sticky-nav.${getNtcoStatus(task.status)}`}</Snippet></h2>
            <MakeDecision schema={schema} formFields={formFields} />
            {
              task.canBeWithdrawn && <WithdrawApplication type={task.type} showHeading />
            }
          </StickyNavAnchor>
      }

      {
        schema.status.options.length === 0 && task.canBeWithdrawn &&
          <StickyNavAnchor id="withdraw">
            <h2><Snippet type={task.type}>sticky-nav.withdraw</Snippet></h2>
            <WithdrawApplication type={task.type} />
          </StickyNavAnchor>
      }

    </StickyNavPage>
  );
};

const mapStateToProps = ({ static: { profile, schema } }) => ({ profile, schema });

export default connect(mapStateToProps)(Pil);
