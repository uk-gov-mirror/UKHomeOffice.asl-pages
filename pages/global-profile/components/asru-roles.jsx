import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';

export default function Roles({ roles = ['asruLicensing', 'asruInspector'] }) {
  const model = useSelector(state => state.model);
  const userRoles = roles.filter(role => model[role]);

  return (
    <div className="asru-roles">
      <h3><Snippet>asru.roles.title</Snippet></h3>
      <ul>
        {
          userRoles.map(role => <li key={ role }><Snippet>{ `asru.roles.${role}` }</Snippet></li>)
        }
      </ul>
    </div>
  );
}
