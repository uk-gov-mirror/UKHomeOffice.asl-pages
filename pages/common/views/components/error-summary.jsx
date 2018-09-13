import { size } from 'lodash';
import React from 'react';
import Snippet from '../containers/snippet';

const Errors = ({
  errors
}) => {
  if (!size(errors)) {
    return null;
  }
  return (
    <div className="govuk-error-summary" role="alert" aria-labelledby="error-summary-title" tabIndex="-1">
      <h2 className="govuk-error-summary__title" id="error-summary-title">
        <Snippet>
          {
            size(errors) > 1
              ? 'errors.headingPlural'
              : 'errors.heading'
          }
        </Snippet>
      </h2>
      <div className="govuk-error-summary__body">
        <ul className="govuk-list govuk-error-summary__list">
          {
            Object.keys(errors).map(key =>
              <li key={key}><a href={`#${key}`}><Snippet>{`errors.${key}.${errors[key]}`}</Snippet></a></li>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default Errors;
