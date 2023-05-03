import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Form,
  Header,
  ErrorSummary
} from '@ukhomeoffice/asl-components';
import { Warning, Button } from '@ukhomeoffice/react-components';
import EstablishmentHeader from '../../../common/components/establishment-header';

const formatters = {
  role: {
    mapOptions: opt => {
      return {
        value: opt,
        label: <Snippet>{`fields.role.options.${opt}.label`}</Snippet>,
        hint: <Snippet optional>{`fields.role.options.${opt}.hint`}</Snippet>
      };
    }
  }
};

function InviteForm({ formFields }) {
  return (
    <Fragment>
      { formFields }
      <Warning><Snippet>adminWarning</Snippet></Warning>
      <Button type="submit"><Snippet>buttons.submit</Snippet></Button>
    </Fragment>
  );
}

const Page = ({ establishment }) => (
  <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <ErrorSummary />
      <Header
        title={<Snippet>pages.profile.invite</Snippet>}
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />
      <Form formatters={formatters} detachFields submit={false}>
        <InviteForm />
      </Form>
    </div>
  </div>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Page);
