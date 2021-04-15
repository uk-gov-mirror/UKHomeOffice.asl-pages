import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet, Details, Inset } from '@asl/components';

export default function Schedule2() {
  const rop = useSelector(state => state.static.rop);
  const placesOfBirth = get(rop, 'placesOfBirth') || [];
  return (
    <Fragment>
      <h3><Snippet>animals-born</Snippet></h3>
      <ul>
        {
          placesOfBirth.map((p, i) => (
            <li key={i}><Snippet fallback={`fields.placesOfBirth.options.${p}`}>{`fields.placesOfBirth.options.${p}.label`}</Snippet></li>
          ))
        }
      </ul>
      <h3><Snippet>fields.scheduleTwoDetails.intro</Snippet></h3>
      <p>
        <Details summary={<Snippet>fields.scheduleTwoDetails.summary</Snippet>}>
          <Inset>
            <Snippet>fields.scheduleTwoDetails.details</Snippet>
          </Inset>
        </Details>
      </p>
    </Fragment>
  );
}
