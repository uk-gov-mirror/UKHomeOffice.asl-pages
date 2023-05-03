import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { ControlBar, Header, Snippet } from '@ukhomeoffice/asl-components';

const Confirm = () => {
  const { establishment, targetEstablishment, csrfToken } = useSelector(state => state.static);

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header title={<Snippet>title</Snippet>} />
          <p><Snippet>summary</Snippet></p>

          <h3><Snippet>fields.primaryEstablishment.current.label</Snippet></h3>
          <p className="current-establishment">{establishment.name}</p>

          <h3><Snippet>fields.primaryEstablishment.new.label</Snippet></h3>
          <p className="new-establishment">{targetEstablishment.name}</p>

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
