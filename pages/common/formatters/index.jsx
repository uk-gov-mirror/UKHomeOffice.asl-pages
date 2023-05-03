import React from 'react';
import dict from '@asl/dictionary';
import { JoinAcronyms } from '@ukhomeoffice/asl-components';

export const joinAcronyms = val => {
  return <JoinAcronyms>{ val }</JoinAcronyms>;
};

export function labelFromCode(code) {
  if (typeof code === 'string') {
    return {
      label: `${dict[code.toUpperCase()]} (${code.toUpperCase()})`,
      value: code.toUpperCase()
    };
  }
  return {
    ...code,
    label: `${dict[code.label.toUpperCase()]} (${code.value.toUpperCase()})`,
    value: code.value.toUpperCase()
  };
}

export const defineValue = val => `${dict[val.toUpperCase()]} (${val})`;

export const define = arr => (
  <ul>
    {
      arr.map((val, key) =>
        <li key={key}>{`${dict[val.toUpperCase()]} (${val})`}</li>
      )
    }
  </ul>
);

export const projectTitle = project => {
  return project.title || 'Untitled project';
};
