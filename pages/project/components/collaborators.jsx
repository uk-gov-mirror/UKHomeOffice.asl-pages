import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@ukhomeoffice/asl-components';

function RemoveUser({ id, name }) {
  const removeUserUrl = useSelector(state => state.static.removeUserUrl);
  const url = useSelector(state => state.static.url);

  return (
    <form action={`${removeUserUrl}?referrer=${url}`} method="post">
      <input type="hidden" name="profileId" value={id} />
      <input type="hidden" name="profileName" value={name} />
      <button className="link"><Snippet>collaborators.action</Snippet></button>
    </form>
  );
}

export default function Collaborators() {
  const collaborators = useSelector(state => state.static.project.collaborators);

  if (!collaborators.length) {
    return null;
  }

  return (
    <Fragment>
      <h3><Snippet>collaborators.title</Snippet></h3>
      <table className="govuk-table">
        <thead>
          <tr>
            <th><Snippet>collaborators.fields.name</Snippet></th>
            <th><Snippet>collaborators.fields.email</Snippet></th>
            <th><Snippet>collaborators.fields.action</Snippet></th>
          </tr>
        </thead>
        <tbody>
          {
            collaborators.map(profile => {
              const name = `${profile.firstName} ${profile.lastName}`;
              return (
                <tr key={profile.id}>
                  <td>{name}</td>
                  <td>{profile.email}</td>
                  <td className="actions"><RemoveUser id={profile.id} name={name} /></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </Fragment>
  );
}
