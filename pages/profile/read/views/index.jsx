import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { formatDate } from '../../../../lib/utils';
import { Header, Link, Snippet, TrainingSummary } from '@ukhomeoffice/asl-components';
import Profile from './profile';
import RelatedTasks from '../../../task/list/views/related-tasks';
import { dateFormat } from '../../../../constants';
import EnforcementFlags from '../../../enforcement/components/enforcement-flags';
import EstablishmentHeader from '../../../common/components/establishment-header';

const Index = ({
  allowedActions,
  model,
  establishment,
  isOwnProfile,
  showRelatedTasks
}) => {
  const certificates = model.certificates || [];
  return (
    <Fragment>
      <EnforcementFlags model={model} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header
            title={`${model.firstName} ${model.lastName}`}
            subtitle={<EstablishmentHeader establishment={establishment}/>}
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
                  <dt>Alternative telephone:</dt>
                  <dd>{ model.telephoneAlt }</dd>
                </Fragment>
              }
              {
                model.dob && isOwnProfile && <Fragment>
                  <dt>Date of birth:</dt>
                  <dd>{ formatDate(model.dob, dateFormat.long) }</dd>
                </Fragment>
              }
              {
                allowedActions.includes('profile.permissions') && <Fragment>
                  <dt>Last activity:</dt>
                  <dd>
                    {
                      model.lastLogin
                        ? formatDate(model.lastLogin, dateFormat.datetime)
                        : (
                          model.userId
                            ? 'Unknown'
                            : 'This user has not logged in'
                        )
                    }
                  </dd>
                </Fragment>
              }
            </dl>
          </Fragment>

          <Profile
            profile={model}
            establishment={establishment}
            allowedActions={allowedActions}
            isOwnProfile={isOwnProfile}
          />
        </div>
      </div>
      {
        allowedActions.includes('training.read') && (
          <section className="profile-section">
            <h3><Snippet>training</Snippet></h3>
            <TrainingSummary certificates={certificates} />
            {
              allowedActions.includes('training.update') && <Link page="training.dashboard" label="Manage training" />
            }
          </section>
        )
      }

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
