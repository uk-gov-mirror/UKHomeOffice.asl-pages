import React from 'react';
import classnames from 'classnames';

const Inset = ({
  children,
  className
}) => (
  <div className={classnames('panel', 'panel-wide', className)}>
    {children}
  </div>
);

export default Inset;
