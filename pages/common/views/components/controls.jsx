import React, { Fragment } from 'react';
import Snippet from '../containers/snippet';

const Controls = ({
  url,
  item,
  editLabel = 'Change',
  deleteLabel = 'Remove'
}) => (
  <Fragment>
    <a href={`${url}/${item}/edit`}><Snippet>buttons.edit</Snippet></a>
    <a href={`${url}/${item}/delete`}><Snippet>buttons.delete</Snippet></a>
  </Fragment>
);

export default Controls;
