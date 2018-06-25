import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import ModelSummary from '../../../common/views/containers/model-summary';
import FormControls from '../../../common/views/components/form-controls';

const DeletePage = () => (
  <Fragment>
    <div className="grid-row">
      <div className="column-two-thirds">
        <header>
          <h2>&nbsp;</h2>
          <h1><Snippet>pages.place.delete</Snippet></h1>
        </header>
        <ModelSummary />
        <hr />
        <form method="post">
          <input type="hidden" name="delete" value="true" />
          <FormControls />
        </form>
      </div>
    </div>
  </Fragment>
);

export default DeletePage;
