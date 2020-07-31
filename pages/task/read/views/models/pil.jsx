import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import differenceInYears from 'date-fns/difference_in_years';
import {
  Snippet,
  StickyNavAnchor,
  Link,
  DiffText
} from '@asl/components';
import Modules from '../../../../profile/read/views/modules';
import ProceduresDiff from '../../../../pil/procedures/views/diff';
import SpeciesDiff from '../../../../pil/species/views/diff';

export default function PIL({ task, values }) {
  const profile = useSelector(state => state.static.profile);
  const establishment = useSelector(state => state.static.establishment);
  const over18 = profile.dob ? differenceInYears(new Date(), new Date(profile.dob)) >= 18 : 'unknown';
  const isTransfer = task.type === 'transfer';
  const isReview = task.type === 'review';
  const certificates = task.data.certificates || [];
  const exemptions = task.data.exemptions;
  const showTraining = !isReview || certificates.length > 0;

  const isComplete = !task.isOpen;

  let pil = task.data.action === 'update-conditions' ? values : task.data.data;
  if (isReview) {
    pil = task.data.modelData;
  }

  const applicantKey = `applicant.${task.type === 'application' ? 'application' : 'other'}`;

  return [
    <StickyNavAnchor id="establishment" key="establishment">
      <h2><Snippet>{`sticky-nav.${isTransfer ? 'transfer' : 'establishment'}`}</Snippet></h2>
      {
        isTransfer &&
          <table className="govuk-table compare">
            <thead>
              <tr>
                <th><Snippet>pil.establishment.current</Snippet></th>
                <th><Snippet>pil.establishment.proposed</Snippet></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{pil.establishment.from.name}</td>
                <td><span className="highlight">{pil.establishment.to.name}</span></td>
              </tr>
            </tbody>
          </table>
      }
      {
        !isTransfer && <p>{establishment.name}</p>
      }
    </StickyNavAnchor>,

    <StickyNavAnchor id={applicantKey} key={applicantKey}>
      <h2><Snippet>{`sticky-nav.${applicantKey}`}</Snippet></h2>
      <p><Link page="profile.read" establishmentId={task.data.establishmentId} profileId={profile.id} label={`${profile.firstName} ${profile.lastName}`} /></p>
      <dl>
        <dt><Snippet>pil.applicant.over18</Snippet></dt>
        <dd>{
          over18 === 'unknown'
            ? <Snippet>pil.applicant.missingDob</Snippet>
            : over18 === true ? 'Yes' : 'No'
        }</dd>
      </dl>
    </StickyNavAnchor>,

    <StickyNavAnchor id="procedures" key="procedures">
      <h2><Snippet>sticky-nav.procedures</Snippet></h2>
      <ProceduresDiff before={task.data.modelData} after={task.data.data} />
    </StickyNavAnchor>,

    <StickyNavAnchor id="species" key="species">
      <h2><Snippet>sticky-nav.species</Snippet></h2>
      <SpeciesDiff before={task.data.modelData} after={task.data.data} />
    </StickyNavAnchor>,

    (
      showTraining && (
        <StickyNavAnchor id="training" key="training">
          <h2><Snippet>sticky-nav.training</Snippet></h2>
          {
            certificates && certificates.length > 0
              ? <Modules certificates={certificates} />
              : <p><em><Snippet>pil.training.none</Snippet></em></p>
          }
        </StickyNavAnchor>
      )
    ),

    (
      showTraining && (
        <StickyNavAnchor id="exemptions" key="exemptions">
          <h2><Snippet>sticky-nav.exemptions</Snippet></h2>
          {
            exemptions && exemptions.length > 0
              ? exemptions.map((exemption, index) => (
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
      )
    ),

    (
      task.data.action === 'update-conditions' && (
        <StickyNavAnchor id="conditions" key="conditions">
          <h2><Snippet>sticky-nav.conditions</Snippet></h2>
          <DiffText
            oldValue={pil.conditions}
            newValue={task.data.data.conditions}
            currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
            proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
          />
        </StickyNavAnchor>
      )
    )
  ];
}
