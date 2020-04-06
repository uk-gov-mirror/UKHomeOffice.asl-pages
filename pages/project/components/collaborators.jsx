import React, { Fragment, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';

function RemoveUser({ id }) {
  const removeUserUrl = useSelector(state => state.static.removeUserUrl);
  const url = useSelector(state => state.static.url);
  const formRef = useRef(null);

  function submitForm(e) {
    e.preventDefault();
    if (window.confirm('Are you sure you want to remove this collaborator?')) {
      formRef.current.submit();
    }
  }

  return (
    <form action={`${removeUserUrl}?referrer=${url}`} method="post" ref={formRef}>
      <input type="hidden" name="profileId" value={id} />
      <a href="#" onClick={submitForm}><Snippet>collaborators.action</Snippet></a>
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
            collaborators.map(profile => (
              <tr key={profile.id}>
                <td>{`${profile.firstName} ${profile.lastName}`}</td>
                <td>{profile.email}</td>
                <td className="actions"><RemoveUser id={profile.id} /></td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>
  );
}
