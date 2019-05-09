import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Form } from '@asl/components';

const MakeDecision = ({ schema, csrfToken }) => {
  return (
    <Fragment>
      {
        // if there is only a single option (excluding withdraw) then display it as a button
        schema.status.options.length === 1 &&
        <form method="POST" noValidate>
          <button className="govuk-button" type="submit">{schema.status.options[0].label}</button>
          <input type="hidden" name="_csrf" value={csrfToken} />
          <input type="hidden" id={`status-${schema.status.options[0].value}`} name="status" value={schema.status.options[0].value} />
        </form>
      }

      {
        // if there is more than a single option, render the standard form (radio buttons)
        schema.status.options.length > 1 && <Form />
      }

    </Fragment>
  );
};

const mapStateToProps = (
  { static: { schema, csrfToken } },
  { decisionSchema }
) => ({
  schema: decisionSchema || schema,
  csrfToken
});

export default connect(mapStateToProps)(MakeDecision);
