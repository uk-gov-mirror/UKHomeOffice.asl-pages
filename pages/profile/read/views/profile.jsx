import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import format from 'date-fns/format';
import { defineValue } from '../../../common/formatters';
import {
  Snippet,
  Link
} from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import PilApply from './pil-apply';
import RoleApply from './role-apply';
import { dateFormat } from '../../../../constants';
import { connect } from 'react-redux';

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { isUser: this.props.isUser };
  }

  render() {

    const
      {
        id: estId
      } = this.props.establishment;

    const
      {
        pil,
        address,
        postcode,
        telephone,
        email,
        roles,
        projects,
        establishments
      } = this.props.profile;

    const allowedActions = this.props.allowedActions;
    const title = this.props.title;
    const activeProjects = projects.filter(({ establishmentId, status }) => status === 'active' && establishmentId === estId);
    const estRoles = roles.filter(({ establishmentId }) => establishmentId === estId);

    const isUser = this.state.isUser;

    const profileRole = establishments.find(est => est.id === estId).role;

    console.log('render isUser ', isUser);
    console.log('render profileRole ', profileRole);

    return <Fragment>
      <article className='profile govuk-grid-row'>
        {/* <Header title={name} /> */}
        {
          title && <h2>{title}</h2>
        }
        <p><Link page="establishment.dashboard" establishmentId={estId} label='About this establishment' /></p>

        <div className='separator'/>
        {
          activeProjects && activeProjects.length > 0 && (
            <Fragment>
              <dl>
                <dt><Snippet>projects.title</Snippet></dt>
                <dd>
                  <dl>
                    {
                      !isEmpty(activeProjects) && activeProjects.map(project =>
                        (project.status && <Fragment key={project.id}>
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
                    {
                      isEmpty(activeProjects) && <dd><Snippet>projects.noProjects</Snippet></dd>
                    }
                  </dl>
                </dd>
              </dl>
            </Fragment>
          )
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
                { !isEmpty(estRoles) &&
                  <Fragment>
                    <dd>
                      {
                        estRoles.map(({ type, id }) =>
                          <dd key={id}>{defineValue(type.toUpperCase())}</dd>
                        )
                      }
                    </dd>
                  </Fragment>
                }
                { isEmpty(estRoles) &&
                  <Snippet>responsibilities.noRoles</Snippet>
                }

              </dd>
            </Fragment>
          }
        </dl>
        <RoleApply />

        <div className='separator'/>

        {
          <dl>
            <dt><Snippet>pil.title</Snippet></dt>
            {
              pil && pil.licenceNumber && (
                <Fragment>
                  <dd><Link page="pil.read" pilId={pil.id} label={pil.licenceNumber} /></dd>
                </Fragment>
              )
            }
          </dl>
        }
        <PilApply pil={pil} />

        <div className='separator'/>

        {
          (address || telephone || email) && (
            <Fragment>
              <dt><Snippet>contactDetails.title</Snippet></dt>
              <dl>
                {
                  email && (
                    <Fragment>
                      <dd><Snippet>contactDetails.email</Snippet></dd>
                      <dd><a href={`mailto:${email}`}>{email}</a></dd>
                    </Fragment>
                  )
                }
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

              </dl>
            </Fragment>
          )
        }
        <div className='separator'/>
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
        </dl>

      </article>
    </Fragment>;
  }
}

const mapStateToProps = ({ static: { isUser } }) => ({ isUser });

export default connect(mapStateToProps)(Profile);
