import React from 'react';
import dict from '@asl/dictionary';
import { JoinAcronyms } from '@asl/components';

export const joinAcronyms = val => {
  return <JoinAcronyms>{ val }</JoinAcronyms>;
};

export const labelFromCode = value => ({
  label: `${dict[value.toUpperCase()]} (${value.toUpperCase()})`,
  value: value.toUpperCase()
});

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
