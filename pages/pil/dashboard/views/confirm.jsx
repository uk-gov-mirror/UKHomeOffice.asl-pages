import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, Form, ControlBar } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import EstablishmentHeader from '../../../common/components/establishment-header';

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
        <ControlBar>
          <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
          <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
        </ControlBar>
      </div>
    </div>
  );
}

export default function Confirm() {
  const model = useSelector(state => state.model);
  const { establishment } = useSelector(state => state.static);

  return (
    <Fragment>
      <Header
        title={
          model.status === 'active'
            ? <Snippet>pil.titleAmend</Snippet>
            : <Snippet>pil.title</Snippet>
        }
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />

      <Form detachFields submit={false}>
        <SubmitPIL />
      </Form>
    </Fragment>
  );
}
