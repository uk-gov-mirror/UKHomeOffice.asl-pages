import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';

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
            <th><Snippet>collaborators.fields.role</Snippet></th>
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
                  <td>{profile.role === 'edit' ? 'Edit' : 'Read only'}</td>
                  <td className="actions">
                    <Link page="project.collaborators.update" profileId={profile.id} label={<Snippet>collaborators.action</Snippet>} />
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </Fragment>
  );
}
