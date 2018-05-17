import React from 'react';
import { stringify } from 'qs';

const ExportLink = props => (
  <p>
    Export as <a href={`?${stringify({ ...props, format: 'pdf' })}`}>PDF</a> | <a href={`?${stringify({ ...props, format: 'csv' })}`}>CSV</a>
  </p>
);

export default ExportLink;
