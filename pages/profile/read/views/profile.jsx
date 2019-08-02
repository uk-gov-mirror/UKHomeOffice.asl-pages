import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import differenceInYears from 'date-fns/difference_in_years';
import { formatDate } from '../../../../lib/utils';
import { defineValue } from '../../../common/formatters';
import { Snippet, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { dateFormat } from '../../../../constants';

class Profile extends React.Component {
  render() {
    const { id: estId } = this.props.establishment;
    const isOwnProfile = this.props.isOwnProfile || false;
    const pil = this.props.profile.pil;
    const correctEstablishment = pil && pil.establishmentId === estId;

    const {
      roles,
      projects = [],
      establishments,
      id,
      dob
    } = this.props.profile;

    const allowedActions = this.props.allowedActions || [];
    const activeProjects = projects.filter(({ establishmentId, status }) => status === 'active' && establishmentId === estId);
    const draftProjects = projects.filter(({ establishmentId, status }) => status === 'inactive' && establishmentId === estId);

    const estRoles = roles.filter(({ establishmentId }) => establishmentId === estId);

    const canSeeProjects = isOwnProfile || allowedActions.includes('project.read.all');

    const profileRole = establishments.find(est => est.id === estId).role;
    const pilIncomplete = pil && (pil.status === 'inactive' || pil.status === 'pending');
    const pilActive = pil && pil.status === 'active';

    const over18 = dob ? differenceInYears(new Date(), new Date(dob)) >= 18 : false;

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
                      <Link page='project.read'
                        label={project.title}
                        projectId={project.id}
                        establishmentId={project.establishmentId}
                      />
                    </p>
                    <p>
                      <span>
                        <Snippet
                          expiryDate={formatDate(
                            project.expiryDate,
                            dateFormat.medium
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
                  <Fragment key={project.id}>
                    <p>
                      <Link page='project.read'
                        label={project.title ? project.title : 'Untitled project'}
                        projectId={project.id}
                        establishmentId={project.establishmentId}
                      />
                    </p>
                  </Fragment>
                ))
              }
              {
                isEmpty(draftProjects) && (
                  <p><Snippet>projects.noProjects</Snippet></p>
                )
              }
              {
                isOwnProfile && (
                  <form method='POST' action={`/e/${estId}/projects/create`}>
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
                  page='profile.role.apply.base'
                  establishmentId={estId}
                  profileId={id}
                  className='govuk-button button-secondary'
                  label={<Snippet>responsibilities.roleApply</Snippet>}
                />
                {
                  !isEmpty(estRoles) && (
                    <Link
                      page='profile.role.remove.base'
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
                pil && pil.licenceNumber && correctEstablishment && (
                  <p>
                    <Link
                      page='pil.read'
                      establishmentId={estId}
                      profileId={id}
                      pilId={pil.id}
                      label={pil.licenceNumber}
                    />
                    {
                      pil.status !== 'active' && <span> ({pil.status})</span>
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
                      !dob && isOwnProfile && <p><Link page='account.edit' label={<Snippet>pil.addDob</Snippet>} /></p>
                    }
                  </Fragment>
                )
              }
              {
                (isOwnProfile || allowedActions.includes('pil.create')) &&
                  !pilActive &&
                  over18 &&
                  correctEstablishment &&
                (
                  <p className="control-panel">
                    <Link
                      page='pil.create'
                      establishmentId={estId}
                      profileId={id}
                      className='govuk-button button-secondary'
                      label={<Snippet>{`buttons.${pilIncomplete ? 'pilView' : 'pilApply'}`}</Snippet>}
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
      </Fragment>
    );
  }
}

export default Profile;
