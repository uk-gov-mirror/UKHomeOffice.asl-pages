import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import sortBy from 'lodash/sortBy';
import {
  Header,
  PanelList,
  Link,
  ExpandingPanel,
  Snippet,
  TrainingSummary,
  Inset
} from '@ukhomeoffice/asl-components';

import dateFormatter from 'date-fns/format';
import { dateFormat } from '../../../constants';

import Profile from '../../profile/read/views/profile';
import RelatedTasks from '../../task/list/views/related-tasks';
import AsruRoles from '../components/asru-roles';

const selector = ({
  model,
  static: {
    allowedActions,
    asruUser,
    isOwnProfile
  }
}) => ({
  model,
  allowedActions,
  asruUser,
  isOwnProfile
});

const formatDate = (date, format) => (date ? dateFormatter(date, format) : '-');

const ProfileMerges = ({ profile }) => {
  if (!profile.profileMerges || profile.profileMerges.length === 0) {
    return null;
  }

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-three-quarters">
        {
          profile.profileMerges.map(merge =>
            <Inset key={merge.id}>
              <Snippet
                label={`${merge.profile.name} (${merge.profile.email})`}
                mergedProfileUrl={`/profile/${merge.profile.id}`}
              >profileMerge.info</Snippet>
            </Inset>
          )
        }
      </div>
    </div>
  );
};

export default function Index({ dedupe, AsruRolesComponent, children }) {
  const { model, allowedActions, asruUser, isOwnProfile } = useSelector(selector, shallowEqual);
  const hasEstablishments = !!(model.establishments || []).length;

  const showEmail = asruUser || model.asruLicensing || isOwnProfile;

  function getAsruRoles() {
    if (AsruRolesComponent) {
      return <AsruRolesComponent />;
    }

    if (!model.asruUser) {
      return null;
    }

    return (
      <ul className="panel-list">
        <li>
          <h2><Snippet>asru.title</Snippet></h2>
          <AsruRoles />
        </li>
      </ul>
    );
  }

  return (
    <Fragment>
      <Header title={`${model.firstName} ${model.lastName}`} />

      <ProfileMerges profile={model} />

      { dedupe }

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
          model.telephoneAlt && <Fragment>
            <dt>Alternative telephone:</dt>
            <dd>
              { model.telephoneAlt }
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
          model.dob && (
            <Fragment>
              <dt>Date of birth:</dt>
              <dd>
                { formatDate(model.dob, dateFormat.long) }
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
          asruUser && (
            <Fragment>
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
          )
        }
      </dl>
      {
        !model.asruUser && (
          <Fragment>
            <h2><Snippet>pil.training.title</Snippet></h2>
            <TrainingSummary certificates={model.certificates} />
          </Fragment>
        )
      }

      {
        getAsruRoles()
      }

      {
        hasEstablishments && <Fragment>
          <h2>Establishments</h2>
          <PanelList panels={sortBy(model.establishments, 'name').map((establishment) => {
            const title = <h3>
              {establishment.name}
              { establishment.status === 'inactive' && <span className="status-notice">(draft - establishment not yet licensed)</span> }
              { establishment.status === 'revoked' && <span className="status-notice">(revoked - establishment no longer licensed)</span> }
            </h3>;
            return (
              <ExpandingPanel key={establishment.id} title={title} wrapTitle={false} isOpen={model.establishments.length === 1}>
                <p>
                  <Link page="establishment.dashboard" establishmentId={establishment.id} label={<Snippet>establishment.link</Snippet>} />
                </p>
                <Profile establishment={establishment} profile={model} allowedActions={allowedActions} />
              </ExpandingPanel>
            );
          })} />
        </Fragment>
      }
      { children }
      {
        !model.asruUser && <RelatedTasks />
      }
    </Fragment>
  );
}
