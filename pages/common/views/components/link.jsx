import React from 'react';
import { get } from 'lodash';

const replace = params => fragment => {
  return fragment[0] === ':' ? params[fragment.substr(1)] : fragment;
};

const Link = ({
  url,
  urls,
  page,
  path,
  label,
  ...props
}) => {
  if (page) {
    const href = get(urls, page);
    if (!href) {
      throw new Error(`Unknown link target: ${page}`);
    }
    const replacer = replace(props);
    url = href.split('/').map(replacer).join('/');
    return <a href={url}>{label}</a>;
  } else {
    return <a href={`${url}/${path}`}>{label}</a>;
  }
};

export default Link;
