import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Snippet, StickyNavPage, StickyNavAnchor, Link, Inset, DiffText, Field } from '@asl/components';
import { dateFormat } from '../../../../constants';
import { procedureDefinitions } from '../../../pil/content';
import format from 'date-fns/format';
import WithdrawApplication from './withdraw-application';
import MakeDecision from './make-decision';
import Modules from './modules';

const Pil = ({ profile, values, task, children, schema, formFields }) => {
  const pil = task.data.action === 'update-conditions' ? values : task.data.data;

  return (
    <StickyNavPage>

      { children }

      <StickyNavAnchor id={`applicant.${task.type}`}>
        <h2><Snippet>{`sticky-nav.applicant.${task.type}`}</Snippet></h2>
        <p><Link page="profile.view" establishmentId={task.data.establishmentId} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} /></p>
        <dl>
          <dt><Snippet>pil.applicant.dob</Snippet><span>:</span></dt>
          <dd>{profile.dob ? format(profile.dob, dateFormat.medium) : <Snippet>pil.applicant.missingDob</Snippet>}</dd>
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
            ? <Modules certificates={profile.certificates} />
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
                  <dd>{exemption.module}
                    {
                      exemption.species && exemption.species.length > 0 &&
                        (
                          <Fragment>
                            { exemption.species.map((s, index) => (
                              <p key={index}>{s}</p>
                            ))}
                          </Fragment>
                        )

                    }</dd>

                  <dt><Snippet>pil.exemptions.reason</Snippet><span>:</span></dt>
                  <dd>{exemption.description}</dd>
                </dl>
              </div>
            ))
            : <p><em><Snippet>pil.exemptions.none</Snippet></em></p>
        }
      </StickyNavAnchor>

      {
        task.data.action === 'update-conditions' && (
          <StickyNavAnchor id="conditions">
            <h2><Snippet>sticky-nav.conditions</Snippet></h2>
            <DiffText oldValue={pil.conditions} newValue={task.data.data.conditions} />
          </StickyNavAnchor>
        )
      }

      {
        task.data.meta.comments && (
          <StickyNavAnchor id="comments">
            <Field
              title={<Snippet>sticky-nav.comments</Snippet>}
              content={task.data.meta.comments}
            />
          </StickyNavAnchor>
        )
      }

      {
        schema.status.options.length > 0 &&
          <StickyNavAnchor id="status">
            <h2><Snippet type={task.type}>sticky-nav.status</Snippet></h2>
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

const mapStateToProps = ({ static: { profile, schema, values } }) => ({ profile, schema, values });

export default connect(mapStateToProps)(Pil);
