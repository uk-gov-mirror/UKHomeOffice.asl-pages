import React from 'react';

const Link = ({
  url,
  path,
  label
}) => (
  <a href={`${url}/${path}`}>{label}</a>
);

export default Link;
