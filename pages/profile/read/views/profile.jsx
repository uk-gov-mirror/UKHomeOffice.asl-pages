import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';
import { defineValue } from '../../../common/formatters';
import { Snippet, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { dateFormat } from '../../../../constants';

class Profile extends React.Component {
  render() {
    const { id: estId } = this.props.establishment;
    const isOwnProfile = this.props.isOwnProfile || false;

    const {
      pil,
      telephone,
      email,
      roles,
      projects,
      establishments,
      id
    } = this.props.profile;

    const allowedActions = this.props.allowedActions;
    const activeProjects = projects.filter(
      ({ establishmentId, status }) =>
        status === 'active' && establishmentId === estId
    );
    const estRoles = roles.filter(
      ({ establishmentId }) => establishmentId === estId
    );

    const profileRole = establishments.find(est => est.id === estId).role;
    const pilIncomplete = pil && pil.status !== 'active';
    const pilActive = pil && pil.status === 'active';

    return (
      <Fragment>

        {activeProjects && (
          <Fragment>
            <dl>
              <dt>
                <Snippet>projects.title</Snippet>
              </dt>
              <dd>
                {!isEmpty(activeProjects) &&
                  activeProjects.map(
                    project =>
                      project.status && (
                        <Fragment key={project.id}>
                          <p>
                            <Link page='project.list' label={project.title} />
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
                                expiryDate={format(
                                  project.expiryDate,
                                  dateFormat.medium
                                )}
                              >
                                projects.expiryDate
                              </Snippet>
                            </span>
                          </p>
                        </Fragment>
                      )
                  )}
                {isEmpty(activeProjects) && (
                  <Snippet>projects.noProjects</Snippet>
                )}
              </dd>
            </dl>
          </Fragment>
        )}

        {
          (allowedActions.includes('project.apply') && <Fragment>
            <form method='POST' action={`/e/${estId}/projects/create`}>
              <p className="control-panel">
                <Button className='govuk-button add-margin'>
                  <Snippet>buttons.pplApply</Snippet>
                </Button>
              </p>
            </form>
          </Fragment>)
        }

        <hr />

        {
          <Fragment>
            <dl>
              <dt>
                <Snippet>responsibilities.title</Snippet>
              </dt>

              {
                !isEmpty(estRoles) && estRoles.map(({ type, id }) => (
                  <dd key={id}>{defineValue(type.toUpperCase())}</dd>
                ))
              }
              {
                isEmpty(estRoles) && (
                  <dd><Snippet>responsibilities.noRoles</Snippet></dd>
                )
              }
            </dl>
          </Fragment>
        }

        {
          allowedActions.includes('profile.roles') &&
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
                <Fragment>
                  &nbsp;
                  <Link
                    page='profile.role.remove.base'
                    establishmentId={estId}
                    profileId={id}
                    className='govuk-button'
                    label={<Snippet>responsibilities.roleRemove</Snippet>}
                  />
                </Fragment>
              )
            }
          </p>
        }

        <hr />

        <dl>
          <dt>
            <Snippet>pil.title</Snippet>
          </dt>
          {pil && pil.licenceNumber && (
            <Fragment>
              <dd>
                <Link
                  page='pil.read'
                  pilId={pil.id}
                  label={pil.licenceNumber}
                />
              </dd>
            </Fragment>
          )}
          {!pil && (
            <dd>
              <Snippet>pil.noPil</Snippet>
            </dd>
          )}
          {
            pil && pilIncomplete && (<dd>
              <Snippet>pil.incompletePil</Snippet>
            </dd>)
          }
        </dl>
        {
          (isOwnProfile || allowedActions.includes('pil.create')) && !pilActive &&
          <p className="control-panel">
            <Link
              page='pil.create'
              establishmentId={estId}
              profileId={id}
              className='govuk-button'
              label={<Snippet>{`buttons.${pilIncomplete ? 'view' : 'pilApply'}`}</Snippet>}
            />
          </p>
        }

        <hr />

        {(telephone || email) && (
          <Fragment>
            <dl>
              <dt>
                <Snippet>contactDetails.title</Snippet>
              </dt>
              {email && (
                <Fragment>
                  <dd>
                    <Snippet>contactDetails.email</Snippet>:{' '}
                    <a href={`mailto:${email}`}>{email}</a>
                  </dd>
                </Fragment>
              )}
              {telephone && (
                <Fragment>
                  <dd>
                    <Snippet>contactDetails.telephone</Snippet>
                    <p>{telephone}</p>
                  </dd>
                </Fragment>
              )}
            </dl>
          </Fragment>
        )}

        <hr />

        {allowedActions.includes('profile.permissions') && (
          <Fragment>
            <dl>
              <dt>
                <Snippet role={profileRole}>permissionLevel.title</Snippet>
              </dt>
              <dt>{profileRole}</dt>
            </dl>
            <p className="control-panel">
              <Link
                page='profile.permission'
                establishmentId={estId}
                profileId={id}
                className='govuk-button'
                label={<Snippet>pages.profile.permission.change</Snippet>}
              />
            </p>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Profile;
