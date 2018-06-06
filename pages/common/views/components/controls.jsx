import React, { Fragment } from 'react';

const Controls = ({
  url,
  item,
  editLabel = 'Change',
  deleteLabel = 'Remove'
}) => (
  <Fragment>
    <a href={`${url}/${item}/edit`}>{editLabel}</a>
    <a href={`${url}/${item}/delete`}>{deleteLabel}</a>
  </Fragment>
);

export default Controls;
