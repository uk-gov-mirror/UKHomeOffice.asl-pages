import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ControlBar, Header, Snippet } from '@asl/components';

const Confirm = () => {
  const { project, establishment, targetEstablishment, csrfToken } = useSelector(state => state.static);

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header title={<Snippet>title</Snippet>} />

          <p>Changing the primary establishment will immediately transfer the draft project</p>
          <h3>{project.title}</h3>

          <p>to</p>
          <h2>{targetEstablishment.name}</h2>

          <p>removing it from</p>
          <h2>{establishment.name}</h2>

          <form method="POST">
            <ControlBar>
              <input type="hidden" name="_csrf" value={csrfToken} />
              <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
              <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
              <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
            </ControlBar>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Confirm;
