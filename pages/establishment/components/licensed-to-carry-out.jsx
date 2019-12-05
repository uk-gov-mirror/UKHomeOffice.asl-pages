import React, { Fragment } from 'react';
import content from './content';

export default function LicensedToCarryOut({ establishment }) {
  return (
    <Fragment>
      {
        (establishment.procedure || establishment.breeding || establishment.supplying) &&
          <ul>
            {
              ['procedure', 'breeding', 'supplying'].filter(auth => establishment[auth]).map(auth =>
                <li key={auth}>{content.licensedTo[auth]}</li>
              )
            }
          </ul>
      }
      {
        !(establishment.procedure || establishment.breeding || establishment.supplying) && '-'
      }
    </Fragment>
  );
}
