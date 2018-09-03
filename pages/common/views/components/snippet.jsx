import { get } from 'lodash';
import React, { Fragment } from 'react';
import ReactMarkdown from 'react-markdown';
import { render } from 'mustache';

const trim = value => value.split('\n').map(s => s.trim()).join('\n').trim();

const Snippet = ({ content, children, optional, ...props }) => {
  const str = get(content, children);
  if (str === undefined && optional) {
    return null;
  }
  if (str === undefined) {
    throw new Error(`Failed to lookup content snippet: ${children}`);
  }
  const source = trim(render(str, props));

  const isRootParagraph = (node, i, parent) => {
    return node.type !== 'paragraph' || parent.type !== 'root' || parent.children.length !== 1;
  };

  return (
    <ReactMarkdown
      source={source}
      renderers={{ root: Fragment }}
      allowNode={isRootParagraph}
      unwrapDisallowed={true}
    />
  );
};

export default Snippet;
