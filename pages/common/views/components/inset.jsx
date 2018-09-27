import React from 'react';
import classnames from 'classnames';

const Inset = ({
  children,
  className
}) => (
  <div className={classnames('govuk-inset-text', className)}>
    {children}
  </div>
);

export default Inset;
