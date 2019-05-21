import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import formatDate from 'date-fns/format';
import { defineValue } from '../../../common/formatters';
import { Snippet, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { dateFormat } from '../../../../constants';

class Profile extends React.Component {
  render() {
    const { id: estId } = this.props.establishment;
    const isOwnProfile = this.props.isOwnProfile || false;
    const pil = this.props.profile.pil && this.props.profile.pil.establishmentId === estId ? this.props.profile.pil : null;

    const {
      roles,
      projects = [],
      establishments,
      id,
      certificates
    } = this.props.profile;

    const allowedActions = this.props.allowedActions || [];
    const activeProjects = projects.filter(({ establishmentId, status }) => status === 'active' && establishmentId === estId);
    const draftProjects = projects.filter(({ establishmentId, status }) => status === 'inactive' && establishmentId === estId);

    const estRoles = roles.filter(({ establishmentId }) => establishmentId === estId);

    const canSeeProjects = isOwnProfile || allowedActions.includes('project.read.all');

    const profileRole = establishments.find(est => est.id === estId).role;
    const pilIncomplete = pil && (pil.status === 'inactive' || pil.status === 'pending');
    const pilActive = pil && pil.status === 'active';

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
                  <Fragment key={project.id}>
                    <p>
                      <Link page='project.read'
                        label={project.title}
                        projectId={project.id}
                        establishmentId={project.establishmentId}
                      />
                    </p>
                    <p>
                      <span>
                        <Snippet licenceNumber={project.licenceNumber}>
                          projects.licenceNumber
                        </Snippet>
                      </span>
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
                  </Fragment>
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
                      <Button className='govuk-button add-margin'>
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
                  className='govuk-button'
                  label={<Snippet>responsibilities.roleApply</Snippet>}
                />
                {
                  !isEmpty(estRoles) && (
                    <Link
                      page='profile.role.remove.base'
                      establishmentId={estId}
                      profileId={id}
                      className='govuk-button'
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
                pil && pil.licenceNumber && (
                  <p>
                    <Link
                      page='pil.read'
                      establishmentId={estId}
                      profileId={id}
                      pilId={pil.id}
                      label={pil.licenceNumber}
                    />
                  </p>
                )
              }
              <h3>
                <Snippet>pil.training.title</Snippet>
              </h3>
              {
                certificates && certificates.length > 0
                  ? certificates.map((certificate, index) => (
                    <div key={index}>
                      <p><Snippet>pil.training.certificate.number</Snippet><span>:</span> {certificate.certificateNumber}</p>
                      <p><Snippet>pil.training.certificate.awarded</Snippet><span>:</span> {formatDate(certificate.passDate)}</p>
                      <p><Snippet>pil.training.certificate.body</Snippet><span>:</span> {certificate.accreditingBody}</p>
                      <p><Snippet>pil.training.certificate.modules</Snippet></p>
                      <p><ul>
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
                      </ul></p>
                    </div>
                  ))
                  : <p><em><Snippet>pil.training.none</Snippet></em></p>
              }
              {
                !pil && (
                  <p>
                    <Snippet>pil.noPil</Snippet>
                  </p>
                )
              }
              {
                pil && pilIncomplete && (
                  <p>
                    <Snippet>pil.incompletePil</Snippet>
                  </p>
                )
              }
              {
                (isOwnProfile || allowedActions.includes('pil.create')) && !pilActive && (
                  <p className="control-panel">
                    <Link
                      page='pil.create'
                      establishmentId={estId}
                      profileId={id}
                      className='govuk-button'
                      label={<Snippet>{`buttons.${pilIncomplete ? 'view' : 'pilApply'}`}</Snippet>}
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
              <p>{profileRole}</p>
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
