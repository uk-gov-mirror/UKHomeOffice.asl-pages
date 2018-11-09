import React, { Fragment } from 'react';
import { Snippet } from '@asl/components';

const Success = ({
  ...props
}) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <div className="govuk-box-highlight">
          <h1 className="heading-xlarge"><Snippet>heading</Snippet></h1>
        </div>
        <p className="font-medium"><Snippet>subheading</Snippet></p>
        <p><Snippet>text1</Snippet></p>
        <p><Snippet>text2</Snippet></p>
        <a href="/" className="button"><Snippet>homepage</Snippet></a>
      </div>
    </div>
  </Fragment>
);

export default Success;
