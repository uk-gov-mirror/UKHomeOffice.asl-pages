import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { Warning } from '@ukhomeoffice/react-components';
import {
  Accordion,
  ExpandingPanel,
  Snippet,
  Conditions,
  Link,
  DocumentHeader,
  LicenceStatusBanner,
  Inset
} from '@asl/components';
import ProfileLink from '../../components/profile-link';
import RelatedTasks from '../../../task/list/views/related-tasks';
import EnforcementFlags from '../../../enforcement/components/enforcement-flags';
import Reminders from '../../../common/components/reminders';

function Index() {
  const { establishment, allowedActions, openTask, showRelatedTasks, errors } = useSelector(state => state.static);

  const killing = establishment.authorisations.filter(({ type }) => type === 'killing');
  const rehomes = establishment.authorisations.filter(({ type }) => type === 'rehomes');
  const canUpdateConditions = allowedActions.includes('establishment.updateConditions');
  const canAmendDetails = allowedActions.includes('establishment.update');
  const canDownloadPDF = allowedActions.includes('establishment.pdf');
  const canSeeRevoke = allowedActions.includes('establishment.revoke') && establishment.status === 'active';
  const canActionRevoke = canSeeRevoke && !establishment.hasActiveLicences;
  const isDraft = establishment.status === 'inactive';
  const actionKey = isDraft ? 'draftAmend' : (establishment.status === 'active' ? 'amend' : 'reapply');

  return (
    <Fragment>
      <LicenceStatusBanner licence={establishment} licenceType="pel" />
      <EnforcementFlags model={establishment} modelType="details" />
      <Reminders model={establishment} licenceType="Establishment" />

      <DocumentHeader
        subtitle={establishment.name}
        title={<Snippet>{`page.title.${isDraft ? 'draft' : 'granted'}`}</Snippet>}
        backLink={<Link page="establishment.dashboard" label={<Snippet>action.backToDash</Snippet>} />}
      >
        {
          canDownloadPDF &&
            <dl>
              <dt>Downloads</dt>
              <dd>
                <ul>
                  <li><Link page="establishment.pdf" label={<Snippet>action.download.pdf</Snippet>} /></li>
                </ul>
              </dd>
            </dl>
        }
      </DocumentHeader>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <dl>
            <dt><Snippet>establishmentLicenceNumber</Snippet></dt>
            <dd>{ establishment.licenceNumber ? establishment.licenceNumber : '-' }</dd>

            <dt><Snippet>address</Snippet></dt>
            <dd>{ establishment.address ? establishment.address : '-' }</dd>

            <dt><Snippet>country.label</Snippet></dt>
            <dd><Snippet>{ `country.${establishment.country || 'unknown'}` }</Snippet></dd>

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
            <ExpandingPanel title={<Snippet>conditions.title</Snippet>} isOpen={!isEmpty(errors)}>
              {
                <Conditions
                  conditions={establishment.conditions}
                  canUpdate={canUpdateConditions && !openTask}
                  label={<Snippet>conditions.hasConditions</Snippet>}
                  noConditionsLabel={<Snippet>conditions.noConditions</Snippet>}
                  editing={!isEmpty(errors)}
                  reminders={establishment.reminders}
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
              <Snippet>{`action.${actionKey}.summary`}</Snippet>
              <Link
                page="establishment.update"
                label={<Snippet>{`action.${actionKey}.button`}</Snippet>}
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
}

export default Index;
