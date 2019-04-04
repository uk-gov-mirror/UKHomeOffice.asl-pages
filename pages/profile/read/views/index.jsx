import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import dateFormatter from 'date-fns/format';
import { Header } from '@asl/components';
import Profile from './profile';
import { dateFormat } from '../../../../constants';

const Index = ({
  allowedActions,
  model,
  establishment,
  isOwnProfile
}) => {

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Header
          title={`${model.firstName} ${model.lastName}`}
          subtitle={establishment.name}
        />
        <Fragment>
          <dl>
            <dt>Email:</dt>
            <dd><a href={`mailto:${model.email}`}>{ model.email }</a></dd>
            {
              model.telephone && <Fragment>
                <dt>Telephone:</dt>
                <dd>{ model.telephone }</dd>
              </Fragment>
            }
            {
              model.dob && isOwnProfile && <Fragment>
                <dt>Date of birth:</dt>
                <dd>{ dateFormatter(model.dob, dateFormat.medium) }</dd>
              </Fragment>
            }
          </dl>
        </Fragment>

        <Profile profile={model} establishment={establishment} allowedActions={allowedActions} isOwnProfile={isOwnProfile} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ static: { establishment, allowedActions, isOwnProfile }, model }) => ({ establishment, model, allowedActions, isOwnProfile });

export default connect(mapStateToProps)(Index);
