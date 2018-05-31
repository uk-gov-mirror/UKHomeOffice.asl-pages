import React from 'react';
import { stringify } from 'qs';

const ExportLink = ({
  label = 'Export as',
  ...props
}) => (
  <p>
    {`${label} `}<a href={`?${stringify({ ...props, format: 'pdf' })}`}>PDF</a> | <a href={`?${stringify({ ...props, format: 'csv' })}`}>CSV</a>
  </p>
);

export default ExportLink;
