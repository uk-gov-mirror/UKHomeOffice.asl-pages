import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, Form } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';

function SubmitPIL({ formFields }) {
  const model = useSelector(state => state.model);
  const { isAsru, isLicensing } = useSelector(state => state.static);

  const isPilTransfer = !!model.establishment.to;
  let submitSnippet = 'buttons.submit';

  if (isAsru && !isPilTransfer) {
    submitSnippet = 'buttons.submitAsAsru';

    if (isLicensing) {
      submitSnippet = 'buttons.submitAsLicensing';
    }
  }

  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        { formFields }
        <Button><Snippet>{ submitSnippet }</Snippet></Button>
      </div>
    </div>
  );
}

export default function Confirm() {
  return (
    <Fragment>
      <Header title={<Snippet>title</Snippet>} />

      <Form detachFields submit={false}>
        <SubmitPIL />
      </Form>
    </Fragment>
  );
}
