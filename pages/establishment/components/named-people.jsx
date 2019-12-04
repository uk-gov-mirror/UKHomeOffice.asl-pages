import React, { Fragment } from 'react';
import { Link } from '@asl/components';
import content from './content';

export default function NamedPeople({ establishment, showLinks = false }) {
  return (
    <dl className="inline">
      {
        ['pelh', 'nprc', 'nacwo', 'nio', 'nvs', 'ntco'].map(role =>
          <Fragment key={role}>
            <dt>{content.namedRoles[role]}</dt>
            <dd>
              {
                establishment[role] && `${establishment[role].firstName} ${establishment[role].lastName}`
              }

              {
                !establishment[role] && !showLinks && '-'
              }

              {/* don't display the add person link for NPRC if there is a PELH */}
              {
                !establishment[role] && showLinks && (
                  role === 'nprc' && establishment.pelh
                    ? '-'
                    : <Link page="profile.list" label={`Add ${role.toUpperCase()}`} />
                )
              }
            </dd>
          </Fragment>
        )
      }
    </dl>
  );
}
