import React, { Fragment, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import { differenceInYears } from 'date-fns';
import { Button } from '@ukhomeoffice/react-components';
import { Snippet, Link, Tabs } from '@ukhomeoffice/asl-components';
import { formatDate } from '../../../../lib/utils';
import { defineValue, projectTitle } from '../../../common/formatters';
import LeaveEstablishment from './leave-establishment';
import { dateFormat } from '../../../../constants';

function ProjectDetails({ project, establishment }) {
  const isDraft = project.status === 'inactive';
  const additionalEstablishments = (project.additionalEstablishments || []).filter(aa => isDraft || aa.status === 'active');
  const isAdditionalAvailability = project.establishmentId !== establishment.id;
  const hasAdditionalAvailability = additionalEstablishments.length > 0;
  const aaEstablishmentNames = additionalEstablishments.map(e => e.name).sort().join(', ');
  const showInfo = !isDraft || project.isLegacyStub || hasAdditionalAvailability || isAdditionalAvailability;

  return (
    <div className="project">
      <p>
        <Link
          page='project.read'
          label={projectTitle(project)}
          projectId={project.id}
          establishmentId={project.establishmentId}
        />
      </p>

      {
        showInfo &&
          <ul className="no-margin">
            {
              project.isLegacyStub && <li>Partial record</li>
            }
            { project.revocationDate &&
              <li>
                <Snippet revocationDate={formatDate(project.revocationDate, dateFormat.long)}>projects.revocationDate</Snippet>
              </li>
            }
            { !project.revocationDate && project.expiryDate &&
              <li>
                <Snippet expiryDate={formatDate(project.expiryDate, dateFormat.long)}>{project.status === 'active' ? 'projects.expiry' : 'projects.expired'}</Snippet>
              </li>
            }

            { isAdditionalAvailability &&
              <li>
                <Snippet establishmentName={project.establishment.name}>
                  {`projects.primaryAvailabilityAt.${isDraft ? 'application' : 'licence'}`}
                </Snippet>
              </li>
            }
            { hasAdditionalAvailability &&
              <li>
                <Snippet establishmentNames={aaEstablishmentNames}>projects.additionalAvailabilityAt</Snippet>
              </li>
            }
          </ul>
      }
    </div>
  );
}

export default function Profile({ profile, establishment = {}, allowedActions = [], isOwnProfile = false }) {
  const {
    pil,
    roles = [],
    projects = [],
    establishments = [],
    dob,
    pilLicenceNumber,
    rcvsNumber
  } = profile;

  const projectTabs = ['active', 'drafts', 'inactive'];
  const [projectTab, setProjectTab] = useState(projectTabs[0]);

  const changeTab = tab => e => {
    e.preventDefault();
    setProjectTab(tab);
  };

  const correctEstablishment = pil && pil.establishmentId === establishment.id;

  const filterProjects = status => project => {
    if (Array.isArray(status)) {
      if (!status.includes(project.status)) {
        return false;
      }
    } else if (project.status !== status) {
      return false;
    }
    const isPrimaryEstablishment = project.establishmentId === establishment.id;
    const isAdditionalAvailability = project.additionalEstablishments && project.additionalEstablishments.find(e => e.id === establishment.id);
    return isPrimaryEstablishment || isAdditionalAvailability;
  };

  const activeProjects = projects.filter(filterProjects('active'));
  const draftProjects = projects.filter(filterProjects('inactive'));
  const inactiveProjects = projects.filter(filterProjects(['expired', 'revoked', 'transferred']));

  const estRoles = roles.filter(({ establishmentId }) => establishmentId === establishment.id);

  const canSeeProjects = isOwnProfile || allowedActions.includes('project.read.all');

  const profileRole = (establishments.find(est => est.id === establishment.id) || {}).role;
  const pilIncomplete = pil && (pil.status === 'inactive' || pil.status === 'pending');

  const hasPil = !!(pilLicenceNumber && pil);
  const hasActivePil = hasPil && pil.status === 'active';

  const over18 = dob ? differenceInYears(new Date(), new Date(dob)) >= 18 : false;
  const canApply = (isOwnProfile || allowedActions.includes('pil.create')) &&
    !hasActivePil &&
    over18 &&
    (correctEstablishment || !pilIncomplete);

  let type;

  if (pil && pil.status === 'revoked') {
    type = 'pilReapply';
  } else if (pilIncomplete) {
    type = 'pilView';
  } else {
    type = 'pilApply';
  }

  const applyText = `buttons.${type}`;

  return (
    <Fragment>
      {
        (isOwnProfile || allowedActions.includes('pil.read')) && (
          <section className="profile-section">
            <h3>
              <Snippet>pil.title</Snippet>
            </h3>
            {
              hasPil && (
                <p>
                  <Link
                    page='pil.read'
                    establishmentId={establishment.id}
                    profileId={profile.id}
                    label={pilLicenceNumber}
                  />
                  {
                    pil && pil.status !== 'active' && <span> ({pil.status})</span>
                  }
                </p>
              )
            }
            {
              !pil && over18 && (
                <p>
                  <Snippet>pil.noPil</Snippet>
                </p>
              )
            }
            {
              pil && pilIncomplete && (
                <p>
                  <Snippet>{`pil.${correctEstablishment ? 'incompletePil' : 'incompleteOtherEst'}`}</Snippet>
                </p>
              )
            }
            {
              (!dob || !over18) && (
                <Fragment>
                  {
                    dob && !over18 && <p><Snippet>pil.under18</Snippet></p>
                  }
                  {
                    !dob && !isOwnProfile && <p><Snippet>pil.noDob.otherProfile</Snippet></p>
                  }
                  {
                    !dob && isOwnProfile && <p><Link page='account.update' label={<Snippet>pil.addDob</Snippet>} /></p>
                  }
                </Fragment>
              )
            }
            {
              canApply && (
                <p className="control-panel">
                  <Link
                    page='pil.create'
                    establishmentId={establishment.id}
                    profileId={profile.id}
                    className='govuk-button button-secondary'
                    label={<Snippet>{applyText}</Snippet>}
                  />
                </p>
              )
            }
          </section>
        )
      }
      {
        canSeeProjects && (
          <section className="profile-section">

            <div className="control-panel float-right">
              {
                allowedActions.includes('project.stub.create') &&
                  <Link
                    className="govuk-button button-secondary"
                    page="profile.convertLegacyProject"
                    establishmentId={establishment.id}
                    label={<Snippet>buttons.convertExisting</Snippet>}
                  />
              }

              {
                (isOwnProfile || allowedActions.includes('project.create')) && (
                  <form method='POST' action={`/establishments/${establishment.id}/projects/create`}>
                    <input type="hidden" name="licenceHolderId" value={profile.id} />
                    <Button className='govuk-button button-secondary'>
                      <Snippet>buttons.pplApply</Snippet>
                    </Button>
                  </form>
                )
              }
            </div>

            <h3>Projects</h3>

            <Tabs active={projectTabs.indexOf(projectTab)}>
              {
                projectTabs.map((tab, index) =>
                  <a key={index} href={`#${tab}`} onClick={changeTab(tab)}><Snippet>{`projects.tabs.${tab}`}</Snippet></a>
                )
              }
            </Tabs>

            { projectTab === 'active' &&
              <Fragment>
                { activeProjects.map(project => <ProjectDetails key={project.id} project={project} establishment={establishment} />)}
                {
                  isEmpty(activeProjects) && (
                    <p><Snippet>projects.noProjects</Snippet></p>
                  )
                }
              </Fragment>
            }

            { projectTab === 'drafts' &&
              <Fragment>
                { draftProjects.map(project => <ProjectDetails key={project.id} project={project} establishment={establishment} />) }
                {
                  isEmpty(draftProjects) && (
                    <p><Snippet>projects.noProjects</Snippet></p>
                  )
                }
              </Fragment>
            }

            { projectTab === 'inactive' &&
              <Fragment>
                { inactiveProjects.map(project => <ProjectDetails key={project.id} project={project} establishment={establishment} />) }
                {
                  isEmpty(inactiveProjects) && (
                    <p><Snippet>projects.noProjects</Snippet></p>
                  )
                }
              </Fragment>
            }

          </section>
        )
      }
      <section className="profile-section">
        <h3>
          <Snippet>responsibilities.title</Snippet>
        </h3>
        {
          !isEmpty(estRoles) && estRoles.map(({ type, id }) => {
            return <Fragment key={id}>
              <p>{defineValue(type.toUpperCase())}</p>
              {
                type === 'nvs' && <p className="govuk-hint">
                  <Snippet rcvsNumber={rcvsNumber || 'Unknown'}>responsibilities.rcvsNumber</Snippet>
                </p>
              }
            </Fragment>;
          })
        }
        {
          isEmpty(estRoles) && (
            <p><Snippet>responsibilities.noRoles</Snippet></p>
          )
        }
        {
          allowedActions.includes('profile.roles') && (
            <p className="control-panel">
              <Link
                page='role.create'
                establishmentId={establishment.id}
                profileId={profile.id}
                className='govuk-button button-secondary'
                label={<Snippet>responsibilities.roleApply</Snippet>}
              />
              {
                !isEmpty(estRoles) && (
                  <Link
                    page='role.delete'
                    establishmentId={establishment.id}
                    profileId={profile.id}
                    label={<Snippet>responsibilities.roleRemove</Snippet>}
                  />
                )
              }
            </p>
          )
        }
        {
          <p>
            <Link
              target='_blank'
              rel="noreferrer noopener"
              url='https://www.gov.uk'
              path='guidance/research-and-testing-using-animals#add-a-named-person-role'
              label={<Snippet>responsibilities.guidanceLink</Snippet>}
            />
          </p>
        }
      </section>
      {
        allowedActions.includes('profile.permissions') && (
          <section className="profile-section">
            <h3>
              <Snippet role={profileRole}>permissionLevel.title</Snippet>
            </h3>
            <p><Snippet>{`fields.role.options.${profileRole}.label`}</Snippet></p>
            <Snippet>{`fields.role.options.${profileRole}.hint`}</Snippet>
            <p className="control-panel">
              { !isOwnProfile &&
                <Link
                  page='profile.permission'
                  establishmentId={establishment.id}
                  profileId={profile.id}
                  className='govuk-button'
                  label={<Snippet>pages.profile.permission.change</Snippet>}
                />
              }
            </p>
          </section>
        )
      }
      {
        isOwnProfile && (
          <Fragment>
            <hr />
            <LeaveEstablishment
              profile={profile}
              establishment={establishment}
            />
          </Fragment>
        )
      }
    </Fragment>
  );
}
