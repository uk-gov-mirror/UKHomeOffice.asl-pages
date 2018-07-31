import React from 'react';
import Join from './join';
import Acronym from './acronym';

const JoinAcronyms = ({
  children
}) => {
  if (Array.isArray(children)) {
    return <Join>{ children.map(a => a.toUpperCase()).sort().map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym key={children.toUpperCase()}>{children.toUpperCase()}</Acronym>;
};

export default JoinAcronyms;
