import React from 'react';
import { castArray } from 'lodash';
import classnames from 'classnames';

const concatClassNames = fromProps => {
  return castArray(fromProps).concat(['panel', 'panel-wide']).reduce((all, item) => {
    return { ...all, [item]: true };
  }, {});
};

const Inset = ({
  children,
  className
}) => (
  <div className={classnames(concatClassNames(className))}>
    {children}
  </div>
);

export default Inset;
