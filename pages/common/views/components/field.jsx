import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

const Field = ({ title, content }) => (
  <Fragment>
    <h2>{ title }</h2>
    <ReactMarkdown>{ content }</ReactMarkdown>
  </Fragment>
);

export default Field;
