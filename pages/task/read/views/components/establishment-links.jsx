import React, { Fragment } from 'react';
import { Link } from '@ukhomeoffice/asl-components';
import sortBy from 'lodash/sortBy';

function EstablishmentLink({ establishment, showLink }) {
  const name = establishment.name || establishment['establishment-name'];
  const id = establishment['establishment-id'] || establishment.id;
  return (
    <Fragment>
      {
        showLink
          ? <Link
            page="establishment.read"
            label={name}
            establishmentId={id}
          />
          : <span>{name}</span>
      }
    </Fragment>
  );
}

export default function EstablishmentLinks({ establishments, showLink }) {
  return (
    <ul>
      {
        sortBy(establishments, 'name').map((establishment, index) => {
          return (
            <li key={index}>
              <EstablishmentLink key={index} establishment={establishment} showLink={showLink} />
            </li>
          );
        })
      }
    </ul>
  );
}
