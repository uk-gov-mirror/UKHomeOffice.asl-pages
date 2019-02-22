import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';
import { defineValue } from '../../../common/formatters';
import {
  Snippet,
  Link,
  Header
} from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import PilApply from './pil-apply';
import RoleApply from './role-apply';
import { dateFormat } from '../../../../constants';

class Profile extends React.Component {

  render() {

    const
      {
        id: estId,
        name: establishmentName
      } = this.props.establishment;

    const
      {
        name,
        pil,
        address,
        postcode,
        telephone,
        email,
        roles,
        projects,
        id
      } = this.props.profile;

    const allowedActions = this.props.allowedActions;

    return <Fragment>
      <article className='profile govuk-grid-row'>
        {/* <Header title={name} /> */}

        <p><Link page="establishment.dashboard" establishmentId={estId} label='About this establishment' /></p>

        <div className='separator'/>
        {
          projects && projects.length > 0 && (
            <Fragment>
              <dl>
                <dt><Snippet>projects.title</Snippet></dt>
                <dd>
                  <dl>
                    {
                      projects.map(project =>
                        (project.title && <Fragment key={project.id}>
                          <dd>
                            <Link page="project.list" label={project.title} />
                          </dd>
                          <dd>
                            <span><Snippet licenceNumber={project.licenceNumber}>projects.licenceNumber</Snippet></span>
                          </dd>
                          <dd>
                            <span><Snippet expiryDate={format(project.expiryDate, dateFormat.medium)}>projects.expiryDate</Snippet></span>
                          </dd>
                        </Fragment>)
                      )
                    }
                  </dl>
                </dd>
              </dl>
            </Fragment>
          )
        }
        {
          projects && isEmpty(projects) &&
          <p><Snippet>projects.noProjects</Snippet></p>
        }
        {
          allowedActions.includes('project.apply') && (
            <form method="POST" action={`/e/${estId}/projects/create`}>
              <Button className="govuk-button add-margin"><Snippet>buttons.pplApply</Snippet></Button>
            </form>
          )
        }

        <div className='separator' />

        <dl>
          {
            <Fragment>
              <dt><Snippet>responsibilities.title</Snippet></dt>
              <dd>
                { !isEmpty(roles) &&
                  <Fragment>
                    <ul>
                      {
                        roles.map(({ type, id }) =>
                          <li key={id}>{defineValue(type.toUpperCase())}</li>
                        )
                      }
                    </ul>
                  </Fragment>
                }
                { isEmpty(roles) &&
                  <Snippet>responsibilities.noRoles</Snippet>
                }
                <RoleApply />
              </dd>
            </Fragment>
          }
        </dl>

        <div className='separator'/>

        <dl>
          <dt><Snippet>establishment</Snippet></dt>
          <dd>{establishmentName}</dd>

          {
            pil && pil.licenceNumber && (
              <Fragment>
                <dt><Snippet>personalLicenceNumber</Snippet></dt>
                <dd><Link page="pil.read" pilId={pil.id} label={pil.licenceNumber} /></dd>
              </Fragment>
            )
          }
        </dl>
        <PilApply pil={pil} />

        {
          (address || telephone || email) && (
            <Fragment>
              <dt><Snippet>contactDetails.title</Snippet></dt>
              <dl>
                {
                  address && (
                    <Fragment>
                      <dd><Snippet>contactDetails.professionalAddress</Snippet></dd>
                      <dd>{address}<br />{postcode}</dd>
                    </Fragment>
                  )
                }
                {
                  telephone && (
                    <Fragment>
                      <dd><Snippet>contactDetails.telephone</Snippet></dd>
                      <dd>{telephone}</dd>
                    </Fragment>
                  )
                }
                {
                  email && (
                    <Fragment>
                      <dd><Snippet>contactDetails.email</Snippet></dd>
                      <dd><a href={`mailto:${email}`}>{email}</a></dd>
                    </Fragment>
                  )
                }
              </dl>
            </Fragment>
          )
        }
        {/* <div className='separator'/>
        <Snippet role={profileRole}>permissionLevel.title</Snippet>
        <dl>
          {
            !isUser && allowedActions.includes('profile.permissions') && (
              <Fragment>
                <dt>{profileRole}</dt>
                <dd><Link page="profile.permission" label={<Snippet>pages.profile.permission.change</Snippet>} /></dd>
              </Fragment>
            )
          }
        </dl> */}

      </article>
    </Fragment>;
  }
}

export default Profile;
