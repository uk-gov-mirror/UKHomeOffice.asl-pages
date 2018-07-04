import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import ModelSummary from '../../../common/views/containers/model-summary';
import { TextArea } from 'govuk-react-components';
import FormControls from '../../../common/views/components/form-controls';
import formatters from '../../formatters';

const DeletePage = ({
  model
}) => (
  <Fragment>
    <div className="grid-row">
      <div className="column-two-thirds">
        <header>
          <h2>&nbsp;</h2>
          <h1><Snippet>pages.place.delete</Snippet></h1>
        </header>
        <ModelSummary formatters={formatters} />
        <hr />
        <form method="post">
          <input type="hidden" name="delete" value="true" />
          <TextArea
            label={<Snippet>fields.comments.label</Snippet>}
            value={model.comments}
            name="comments"
          />
          <FormControls />
        </form>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(DeletePage);
