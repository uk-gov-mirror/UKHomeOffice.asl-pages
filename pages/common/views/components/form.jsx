import React from 'react';
import Snippet from '../containers/snippet';
import Fieldset from './fieldset';

const Form = ({
  csrfToken,
  ...props
}) => {
  return <form method="POST" noValidate>
    <Fieldset { ...props } />
    <input type="hidden" name="_csrf" value={csrfToken} />
    <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
  </form>;
};

export default Form;
