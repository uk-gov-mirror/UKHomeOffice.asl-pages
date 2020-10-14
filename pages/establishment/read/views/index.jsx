import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Warning } from '@ukhomeoffice/react-components';
import {
  Accordion,
  ExpandingPanel,
  Snippet,
  Conditions,
  Link,
  DownloadHeader,
  LicenceStatusBanner,
  Inset
} from '@asl/components';
import ProfileLink from '../../components/profile-link';
import RelatedTasks from '../../../task/list/views/related-tasks';

const Index = ({
  establishment,
  allowedActions,
  openTask,
  currentPath,
  showRelatedTasks
}) => {
  const killing = establishment.authorisations.filter(({ type }) => type === 'killing');
  const rehomes = establishment.authorisations.filter(({ type }) => type === 'rehomes');
  const canUpdateConditions = allowedActions.includes('establishment.updateConditions');
  const canAmendDetails = allowedActions.includes('establishment.update');
  const canDownloadPDF = allowedActions.includes('establishment.pdf');
  const canSeeRevoke = allowedActions.includes('establishment.revoke') && establishment.status === 'active';
  const canActionRevoke = canSeeRevoke && !establishment.hasActiveLicences;

  return (
    <Fragment>
      <LicenceStatusBanner licence={establishment} licenceType="pel" />

      <DownloadHeader
        title={establishment.name}
        subtitle="Establishment licence"
        licenceStatus={establishment.status}
        showPdf={canDownloadPDF}
        basename={currentPath}
      />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <dl>
            <dt><Snippet>establishmentLicenceNumber</Snippet></dt>
            <dd>{ establishment.licenceNumber ? establishment.licenceNumber : '-' }</dd>

            <dt><Snippet>address</Snippet></dt>
            <dd>{ establishment.address ? establishment.address : '-' }</dd>

            {
              establishment.pelh && <ProfileLink type="pelh" profile={establishment.pelh} />
            }
            {
              establishment.nprc && <ProfileLink type="nprc" profile={establishment.nprc} />
            }
            <dt><Snippet>licenced.title</Snippet></dt>
            <dd>
              {
                (establishment.procedure || establishment.breeding || establishment.supplying) &&
                  <ul>
                    {
                      ['procedure', 'breeding', 'supplying'].filter(auth => establishment[auth]).map(auth =>
                        <li key={auth}><Snippet>{`licenced.${auth}`}</Snippet></li>
                      )
                    }
                  </ul>
              }
              {
                establishment.isTrainingEstablishment && (
                  <Inset><Snippet>trainingEst</Snippet></Inset>
                )
              }
              {
                !(establishment.procedure || establishment.breeding || establishment.supplying) && '-'
              }
            </dd>
            <dt><Snippet>approvedAreas</Snippet></dt>
            <dd><Link page="place.list" label={<Snippet>action.approvedAreas</Snippet>} /></dd>
            <dt><Snippet>namedPeople</Snippet></dt>
            <dd><Link page="profile.list" label={<Snippet>action.namedPeople</Snippet>} query={{ filters: { roles: ['named'] } }} /></dd>
          </dl>
          <Accordion>
            <ExpandingPanel title={<Snippet>conditions.title</Snippet>}>
              {
                <Conditions
                  conditions={establishment.conditions}
                  canUpdate={canUpdateConditions && !openTask}
                  label={<Snippet>conditions.hasConditions</Snippet>}
                  noConditionsLabel={<Snippet>conditions.noConditions</Snippet>}
                >
                  {
                    openTask && canUpdateConditions && (
                      <Warning>
                        <Snippet>updateInProgress</Snippet>
                        <p>
                          <Link
                            page="task.read"
                            taskId={openTask.id}
                            label={<Snippet>view-task</Snippet>}
                          />
                        </p>
                      </Warning>
                    )
                  }
                </Conditions>
              }
            </ExpandingPanel>
            {
              (!!killing.length || !!rehomes.length) && <ExpandingPanel title={<Snippet>authorisations.title</Snippet>}>
                {
                  !!killing.length && <Fragment>
                    <h2><Snippet>authorisations.killing.title</Snippet></h2>
                    <dl>
                      {
                        killing.map(({ method, description }, index) =>
                          <div key={index}>
                            <dt><Snippet>authorisations.killing.method</Snippet></dt>
                            <dd>{ method }</dd>

                            <dt><Snippet>authorisations.killing.applicableAnimals</Snippet></dt>
                            <dd>{ description }</dd>
                          </div>
                        )
                      }
                    </dl>
                  </Fragment>
                }
                {
                  !!rehomes.length && <Fragment>
                    <h2><Snippet>authorisations.rehoming.title</Snippet></h2>
                    <dl>
                      {
                        rehomes.map(({ method, description }, index) =>
                          <Fragment key={index}>
                            <dt><Snippet>authorisations.rehoming.circumstances</Snippet></dt>
                            <dd>{ method }</dd>

                            <dt><Snippet>authorisations.rehoming.applicableAnimals</Snippet></dt>
                            <dd>{ description }</dd>
                          </Fragment>
                        )
                      }
                    </dl>
                  </Fragment>
                }
              </ExpandingPanel>
            }
          </Accordion>

        </div>
      </div>

      <div className="licence-actions">
        {
          canAmendDetails && (
            <section className="amend-licence">
              <Snippet>action.amend.summary</Snippet>
              <Link
                page="establishment.update"
                label={<Snippet>{`action.${establishment.status === 'active' ? 'amend' : 'reapply'}.button`}</Snippet>}
                className="govuk-button button-secondary"
              />
            </section>
          )
        }
        {
          canSeeRevoke &&
            <section className="revoke-licence">
              {
                canActionRevoke &&
                  <Fragment>
                    <Snippet>action.revoke.summary</Snippet>
                    <Link
                      page="revokeEstablishment"
                      className="govuk-button button-warning"
                      label={<Snippet>action.revoke.button</Snippet>}
                    />
                  </Fragment>
              }

              {
                !canActionRevoke &&
                  <Snippet>action.revoke.unavailable</Snippet>
              }
            </section>
        }
      </div>
      { showRelatedTasks && <RelatedTasks /> }
    </Fragment>
  );
};

const mapStateToProps = ({
  static: {
    establishment,
    allowedActions,
    openTask,
    currentPath,
    showRelatedTasks
  }
}) => ({
  establishment,
  allowedActions,
  openTask,
  currentPath,
  showRelatedTasks
});

export default connect(mapStateToProps)(Index);
