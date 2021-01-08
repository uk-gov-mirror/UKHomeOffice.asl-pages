import React, { Fragment } from 'react';
import { Link } from '@asl/components';
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
    <span>
      {
        sortBy(establishments, 'name').map((establishment, index) => {
          const isLastItem = index === establishments.length - 1;
          const showComma = index > 0 && !isLastItem;
          const showAnd = isLastItem && establishments.length > 1;
          return (
            <Fragment key={index}>
              { showComma && <span>, </span> }
              { showAnd && <span> and </span> }
              <EstablishmentLink key={index} establishment={establishment} showLink={showLink} />
            </Fragment>
          );
        })
      }
    </span>
  );
}
