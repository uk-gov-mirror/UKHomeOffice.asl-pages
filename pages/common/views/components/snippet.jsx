import { get } from 'lodash';
import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { render } from 'mustache';

const Snippet = ({ content, children, ...props }) => {
  const str = get(content, children);
  if (str === undefined) {
    throw new Error(`Could not locate content snippet: ${children}`);
  }
  const source = render(str, props);
  return <ReactMarkdown
    source={source}
    renderers={{ root: Fragment }}
    allowNode={(node, index, parent) => parent.type !== 'root'}
    unwrapDisallowed={true}
  />;
};

export default Snippet;
