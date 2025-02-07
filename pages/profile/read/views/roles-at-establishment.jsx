import React, { Fragment } from 'react';
import isEmpty from 'lodash/isEmpty';
import { Link, Snippet } from '@ukhomeoffice/asl-components';
import { defineValue } from '../../../common/formatters';
import { useFeatureFlag } from '@asl/service/ui/feature-flag';

function RolesAtEstablishment({ establishment, estRoles, rcvsNumber, allowedActions, profile }) {
  const FEATURE_FLAG_NAMED_PERSON_MVP = 'feature-named-person-mvp';
  const namedPersonFeatureFlag = useFeatureFlag(FEATURE_FLAG_NAMED_PERSON_MVP);
  const addRoleLink = namedPersonFeatureFlag ? 'role.namedPersonMvp.beforeYouApply' : 'role.create';

  return (
    <section className="profile-section">
      <h3>
        <Snippet>responsibilities.title</Snippet>
      </h3>
      {
        !isEmpty(estRoles) && estRoles.map(({ type, id }) => {
          return <Fragment key={id}>
            <p>{defineValue(type.toUpperCase())}</p>
            {
              type === 'nvs' && <p className="govuk-hint">
                <Snippet rcvsNumber={rcvsNumber || 'Unknown'}>responsibilities.rcvsNumber</Snippet>
              </p>
            }
          </Fragment>;
        })
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
              page={addRoleLink}
              establishmentId={establishment.id}
              profileId={profile.id}
              className='govuk-button button-secondary'
              label={<Snippet>responsibilities.roleApply</Snippet>}
            />
            {
              !isEmpty(estRoles) && (
                <Link
                  page='role.delete'
                  establishmentId={establishment.id}
                  profileId={profile.id}
                  label={<Snippet>responsibilities.roleRemove</Snippet>}
                />
              )
            }
          </p>
        )
      }
      {
        <p>
          <Link
            target='_blank'
            rel="noreferrer noopener"
            url='https://www.gov.uk'
            path='guidance/research-and-testing-using-animals#add-a-named-person-role'
            label={<Snippet>responsibilities.guidanceLink</Snippet>}
          />
        </p>
      }
    </section>
  );
}

export default RolesAtEstablishment;
