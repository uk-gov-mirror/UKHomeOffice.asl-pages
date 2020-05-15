import React, { Fragment } from 'react';
import { Link } from '@asl/components';
import content from './content';

const renderNames = (roles, showLinks, role) => {
  if (roles.length) {
    return roles.map(r => {
      // roles is sometimes an array of roles with profile prop, sometimes array of profiles
      return `${r.firstName || r.profile.firstName} ${r.lastName || r.profile.lastName}`;
    }).join(', ');
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
          !establishment.pelh && (
            establishment.nprc || !showLinks ? '-' : <Link page="profile.list" label="Add PEL holder" />
          )
        }
      </dd>

      <dt>{content.namedRoles.nprc}</dt>
      <dd>
        {
          establishment.nprc && renderNames([establishment.nprc], showLinks, 'nprc')
        }
        {
          !establishment.nprc && (
            establishment.pelh || !showLinks ? '-' : <Link page="profile.list" label="Add NPRC" />
          )
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
