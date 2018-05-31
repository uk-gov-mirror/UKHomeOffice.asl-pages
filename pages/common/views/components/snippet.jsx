import { get } from 'lodash';
import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';

const Snippet = ({ content, children }) => (
  <ReactMarkdown
    source={get(content, children)}
    renderers={{ root: Fragment }}
    allowNode={(node, index, parent) => parent.type !== 'root'}
    unwrapDisallowed={true}
  />
);

export default Snippet;
