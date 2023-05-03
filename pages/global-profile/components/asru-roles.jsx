import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@ukhomeoffice/asl-components';

export default function Roles({ roles = ['asruLicensing', 'asruInspector'] }) {
  const model = useSelector(state => state.model);
  const userRoles = roles.filter(role => model[role]);

  return (
    <div className="asru-roles">
      <h3><Snippet>asru.roles.title.list</Snippet></h3>
      <ul>
        {
          userRoles.length > 0 &&
            userRoles.map(role => <li key={ role }><Snippet>{ `asru.roles.${role}.label` }</Snippet></li>)
        }
        {
          userRoles.length === 0 &&
            <Snippet name={`${model.firstName} ${model.lastName}`}>asru.roles.none</Snippet>
        }
      </ul>
    </div>
  );
}
