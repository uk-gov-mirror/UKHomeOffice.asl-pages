import React from 'react';
import ErrorSummary from '../containers/error-summary';
import Form from '../containers/form';

const FormLayout = ({
  children,
  formatters
}) => (
  <div className="grid-row">
    <div className="column-two-thirds">
      <ErrorSummary />
      {
        children
      }
      <Form formatters={formatters} />
    </div>
  </div>
);

export default FormLayout;
