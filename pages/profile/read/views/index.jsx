import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../../../lib/utils';
import { Header } from '@asl/components';
import Profile from './profile';
import RelatedTasks from '../../../task/list/views/related-tasks';
import { dateFormat } from '../../../../constants';

const Index = ({
  allowedActions,
  model,
  establishment,
  isOwnProfile,
  showRelatedTasks
}) => {

  return (
    <Fragment>
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
                model.telephoneAlt && <Fragment>
                  <dt>Alt. telephone:</dt>
                  <dd>{ model.telephoneAlt }</dd>
                </Fragment>
              }
              {
                model.dob && isOwnProfile && <Fragment>
                  <dt>Date of birth:</dt>
                  <dd>{ formatDate(model.dob, dateFormat.medium) }</dd>
                </Fragment>
              }
            </dl>
          </Fragment>

          <Profile profile={model} establishment={establishment} allowedActions={allowedActions} isOwnProfile={isOwnProfile} />
        </div>
      </div>
      {
        showRelatedTasks && <RelatedTasks />
      }
    </Fragment>
  );
};

const mapStateToProps = ({
  static: {
    establishment,
    allowedActions,
    isOwnProfile,
    showRelatedTasks
  },
  model
}) => ({
  establishment,
  model,
  allowedActions,
  isOwnProfile,
  showRelatedTasks
});

export default connect(mapStateToProps)(Index);
