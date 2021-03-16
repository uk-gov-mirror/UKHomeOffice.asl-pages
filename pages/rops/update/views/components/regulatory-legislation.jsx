import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet } from '@asl/components';

export default function Endangered() {
  const rop = useSelector(state => state.model);
  return (
    <Fragment>
      <h3><Snippet>purpose.subpurpose</Snippet></h3>
      <ul>
        {
          rop.regulatorySubpurposes.map((s, i) => (
            <li key={i}><Snippet fallback={`fields.regulatorySubpurposes.options.${s}`}>{`fields.regulatorySubpurposes.options.${s}.label`}</Snippet></li>
          ))
        }
      </ul>
    </Fragment>
  );
}
