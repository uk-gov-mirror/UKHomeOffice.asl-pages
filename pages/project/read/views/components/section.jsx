import React, { Fragment } from 'react';

export default function Section({
  title,
  content,
  children
}) {
  return (
    <Fragment>
      <hr />
      <h2>{ title }</h2>
      <p>{ content }</p>
      { children }
    </Fragment>
  );
}
