import React from 'react';
import ReactMarkdown from 'react-markdown';

const Field = ({ title, content }) => (
  <div className="field">
    <h2>{ title }</h2>
    <ReactMarkdown>{ content }</ReactMarkdown>
  </div>
);

export default Field;
