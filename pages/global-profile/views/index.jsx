import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';
import { Header, PanelList, Link, ExpandingPanel, Snippet } from '@asl/components';

import dateFormatter from 'date-fns/format';
import { dateFormat } from '../../../constants';

import Profile from '../../profile/read/views/profile';
import Modules from '../../profile/read/views/modules';
import RelatedTasks from '../../task/list/views/related-tasks';
import AsruRoles from '../components/asru-roles';

const formatDate = (date, format) => (date ? dateFormatter(date, format) : '-');

class Index extends React.Component {

  render () {

    const model = this.props.model;
    const isOwnProfile = this.props.isOwnProfile;
    const hasEstablishments = !!(model.establishments || []).length;

    const showEmail = this.props.asruUser || model.asruLicensing || this.props.isOwnProfile;
    const showDob = (this.props.asruUser || this.props.isOwnProfile) && model.dob;

    return <Fragment>
      <Header title={`${model.firstName} ${model.lastName}`} />
      { this.props.dedupe }
      <dl>
        {
          showEmail && (
            <Fragment>
              <dt>Email:</dt>
              <dd>
                <a href={`mailto:${model.email}`}>{ model.email }</a>
                {
                  isOwnProfile && (
                    <Fragment>
                      {' | '}
                      <Link page="account.updateEmail" label="Edit" />
                    </Fragment>
                  )
                }
              </dd>
            </Fragment>
          )
        }
        {
          model.telephone && <Fragment>
            <dt>Telephone:</dt>
            <dd>
              { model.telephone }
              {
                isOwnProfile && (
                  <Fragment>
                    {' | '}
                    <Link page="account.update" label="Edit" />
                  </Fragment>
                )
              }
            </dd>
          </Fragment>
        }
        {
          showDob && (
            <Fragment>
              <dt>Date of birth:</dt>
              <dd>
                { formatDate(model.dob, dateFormat.medium) }
                {
                  isOwnProfile && (
                    <Fragment>
                      {' | '}
                      <Link page="account.update" label="Edit" />
                    </Fragment>
                  )
                }
              </dd>
            </Fragment>
          )
        }
        {
          this.props.asruUser && (
            <Fragment>
              <dt>Has login:</dt>
              <dd>{ model.userId ? 'Yes' : 'No' }</dd>
            </Fragment>
          )
        }
      </dl>
      {
        !model.asruUser && (
          <Fragment>
            <h2><Snippet>pil.training.title</Snippet></h2>
            {
              model.certificates && model.certificates.length > 0
                ? <Modules certificates={model.certificates} />
                : <p><em><Snippet>pil.training.none</Snippet></em></p>
            }
          </Fragment>
        )
      }

      {
        model.asruUser && <AsruRoles />
      }

      {
        hasEstablishments && <Fragment>
          <h2>Establishments</h2>
          <PanelList panels={sortBy(model.establishments, 'name').map((establishment) => {
            return (
              <ExpandingPanel key={establishment.id} title={establishment.name} isOpen={model.establishments.length === 1}>
                <p>
                  <Link page="establishment.dashboard" establishmentId={establishment.id} label={<Snippet>establishment.link</Snippet>} />
                </p>
                <Profile establishment={establishment} profile={model} allowedActions={this.props.allowedActions} />
              </ExpandingPanel>
            );
          })} />
        </Fragment>
      }
      { this.props.children }
      {
        !model.asruUser && <RelatedTasks />
      }
    </Fragment>;
  }

}

const mapStateToProps = ({ model, static: { allowedActions, asruUser, isOwnProfile } }) => ({ model, allowedActions, asruUser, isOwnProfile });

export default connect(mapStateToProps)(Index);
