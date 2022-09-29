import React, { Fragment } from 'react';
import { Form, Header, Snippet } from '@asl/components';
import { Button, Warning } from '@ukhomeoffice/react-components';

function PasswordChange({ formFields }) {
  return (
    <Fragment>
      <Header title={<Snippet>title</Snippet>} />
      <p><Snippet>summary</Snippet></p>

      { formFields }

      <Warning><Snippet>logoutWarning</Snippet></Warning>

      <p className="control-panel">
        <Button><Snippet>buttons.submit</Snippet></Button>
      </p>
    </Fragment>
  );
}

export default function Page() {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Form detachFields submit={false}>
          <PasswordChange />
        </Form>
      </div>
    </div>
  );
}
