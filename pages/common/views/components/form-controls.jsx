import React, { Fragment } from 'react';
import Snippet from '../containers/snippet';

const FormControls = () => (
  <Fragment>
    <p>
      <button className="button"><Snippet>buttons.submit</Snippet></button>
    </p>
    <p>
      <a href="?clear=true">
        <Snippet>buttons.cancel</Snippet>
      </a>
    </p>
  </Fragment>
);

export default FormControls;
