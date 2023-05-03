import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@ukhomeoffice/asl-components';

export default function Endangered() {
  const rop = useSelector(state => state.model);
  const nopes = [
    'routine-blood',
    'routine-monoclonal',
    'routine-other'
  ];
  const subpurposes = (rop.regulatorySubpurposes || []).filter(s => !nopes.includes(s));
  return (
    <Fragment>
      <h3><Snippet>purpose.subpurpose</Snippet></h3>
      <ul>
        {
          subpurposes.map((s, i) => (
            <li key={i}><Snippet fallback={`fields.regulatorySubpurposes.options.${s}`}>{`fields.regulatorySubpurposes.options.${s}.label`}</Snippet></li>
          ))
        }
      </ul>
    </Fragment>
  );
}
