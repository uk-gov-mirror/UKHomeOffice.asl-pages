import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Snippet, Details, Inset } from '@ukhomeoffice/asl-components';

export default function Schedule2() {
  const rop = useSelector(state => state.model);
  const nopes = [
    'uk-licenced',
    'eu-registered'
  ];
  const placesOfBirth = (get(rop, 'placesOfBirth') || []).filter(p => !nopes.includes(p));
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
