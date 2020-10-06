import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import differenceInYears from 'date-fns/difference_in_years';
import { Button } from '@ukhomeoffice/react-components';
import { Snippet, Link } from '@asl/components';
import { formatDate } from '../../../../lib/utils';
import { defineValue, projectTitle } from '../../../common/formatters';
import LeaveEstablishment from './leave-establishment';
import { dateFormat } from '../../../../constants';

class Profile extends React.Component {
  render() {
    const { id: estId } = this.props.establishment || {};
    const isOwnProfile = this.props.isOwnProfile || false;
    const pil = this.props.profile.pil;
    const correctEstablishment = pil && pil.establishmentId === estId;

    const {
      roles = [],
      projects = [],
      establishments = [],
      id,
      dob,
      pilLicenceNumber
    } = this.props.profile;

    const allowedActions = this.props.allowedActions || [];
    const activeProjects = projects.filter(({ establishmentId, status }) => status === 'active' && establishmentId === estId);
    const draftProjects = projects.filter(({ establishmentId, status }) => status === 'inactive' && establishmentId === estId);

    const estRoles = roles.filter(({ establishmentId }) => establishmentId === estId);

    const canSeeProjects = isOwnProfile || allowedActions.includes('project.read.all');

    const profileRole = (establishments.find(est => est.id === estId) || {}).role;
    const pilIncomplete = pil && (pil.status === 'inactive' || pil.status === 'pending');

    const hasPil = !!(pilLicenceNumber && pil);
    const hasActivePil = hasPil && pil.status === 'active';

    const over18 = dob ? differenceInYears(new Date(), new Date(dob)) >= 18 : false;
    const canApply = (isOwnProfile || allowedActions.includes('pil.create')) &&
      !hasActivePil &&
      over18 &&
      (correctEstablishment || !pilIncomplete);

    let type;

    if (pil.status === 'revoked') {
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
          canSeeProjects && (
            <section className="profile-section">
              <h3>
                <Snippet>projects.title</Snippet>
              </h3>

              {
                activeProjects.map(project => (
                  <div key={project.id} className="project">
                    <p>
                      <Link
                        page='project.read'
                        label={projectTitle(project)}
                        projectId={project.id}
                        establishmentId={project.establishmentId}
                      />
                      { project.isLegacyStub ? ' - Partial record' : '' }
                    </p>
                    <p>
                      <span>
                        <Snippet
                          expiryDate={formatDate(
                            project.expiryDate,
                            dateFormat.long
                          )}
                        >
                          projects.expiryDate
                        </Snippet>
                      </span>
                    </p>
                  </div>
                ))
              }
              {
                isEmpty(activeProjects) && (
                  <p><Snippet>projects.noProjects</Snippet></p>
                )
              }
              <h3>
                <Snippet>projects.drafts</Snippet>
              </h3>
              {
                draftProjects.map(project => (
                  <div key={project.id} className="project">
                    <p>
                      <Link
                        page='project.read'
                        label={projectTitle(project)}
                        projectId={project.id}
                        establishmentId={project.establishmentId}
                      />
                      { project.isLegacyStub ? ' - Partial record' : '' }
                    </p>
                  </div>
                ))
              }
              {
                isEmpty(draftProjects) && (
                  <p><Snippet>projects.noProjects</Snippet></p>
                )
              }
              {
                allowedActions.includes('project.convertLegacy') &&
                  <Link
                    className="govuk-button button-secondary"
                    page="profile.convertLegacyProject"
                    establishmentId={estId}
                    label={<Snippet>buttons.convertExisting</Snippet>}
                  />
              }
              {
                (isOwnProfile || allowedActions.includes('project.create')) && (
                  <form method='POST' action={`/establishments/${estId}/projects/create`}>
                    <input type="hidden" name="licenceHolderId" value={id} />
                    <p className="control-panel">
                      <Button className='govuk-button button-secondary add-margin'>
                        <Snippet>buttons.pplApply</Snippet>
                      </Button>
                    </p>
                  </form>
                )
              }
            </section>
          )
        }
        <section className="profile-section">
          <h3>
            <Snippet>responsibilities.title</Snippet>
          </h3>
          {
            !isEmpty(estRoles) && estRoles.map(({ type, id }) => (
              <p key={id}>{defineValue(type.toUpperCase())}</p>
            ))
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
                  establishmentId={estId}
                  profileId={id}
                  className='govuk-button button-secondary'
                  label={<Snippet>responsibilities.roleApply</Snippet>}
                />
                {
                  !isEmpty(estRoles) && (
                    <Link
                      page='role.delete'
                      establishmentId={estId}
                      profileId={id}
                      label={<Snippet>responsibilities.roleRemove</Snippet>}
                    />
                  )
                }
              </p>
            )
          }
        </section>
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
                      establishmentId={estId}
                      profileId={id}
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
                      !dob && <p><Snippet>{`pil.noDob.${isOwnProfile ? 'ownProfile' : 'otherProfile'}`}</Snippet></p>
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
                      establishmentId={estId}
                      profileId={id}
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
                    establishmentId={estId}
                    profileId={id}
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
                profile={this.props.profile}
                establishment={this.props.establishment}
              />
            </Fragment>
          )
        }
      </Fragment>
    );
  }
}

export default Profile;
