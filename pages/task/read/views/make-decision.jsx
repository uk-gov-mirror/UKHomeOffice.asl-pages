import React, { Fragment } from 'react';
import { Button } from '@ukhomeoffice/react-components';

const MakeDecision = ({ schema, formFields }) => {
  return schema.status.options.length > 1
    ? formFields
    : (
      <Fragment>
        <input type="hidden" id={`status-${schema.status.options[0].value}`} name="status" value={schema.status.options[0].value} />
        <Button>{schema.status.options[0].label}</Button>
      </Fragment>
    );
};

export default MakeDecision;
