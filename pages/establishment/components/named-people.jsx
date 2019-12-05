import React, { Fragment } from 'react';
import { Link } from '@asl/components';
import content from './content';

const renderNames = (profiles, showLinks, role) => {
  if (profiles.length) {
    return profiles.map(profile => `${profile.firstName} ${profile.lastName}`).join(', ');
  }

  if (!showLinks) {
    return '-';
  }

  return <Link page="profile.list" label={`Add ${role.toUpperCase()}`} />;
};

export default function NamedPeople({ establishment, showLinks = false }) {
  return (
    <dl className="inline">
      <dt>{content.namedRoles.pelh}</dt>
      <dd>
        {
          establishment.pelh && renderNames([establishment.pelh], showLinks, 'pelh')
        }
        {
          !establishment.pelh && establishment.nprc && '-'
        }
      </dd>

      <dt>{content.namedRoles.nprc}</dt>
      <dd>
        {
          establishment.nprc && renderNames([establishment.nprc], showLinks, 'nprc')
        }
        {
          !establishment.nprc && establishment.pelh && '-'
        }
      </dd>

      {
        ['nacwo', 'nio', 'nvs', 'ntco'].map(role =>
          <Fragment key={role}>
            <dt>{content.namedRoles[role]}</dt>
            <dd>{renderNames(establishment[role], showLinks, role)}</dd>
          </Fragment>
        )
      }
    </dl>
  );
}
