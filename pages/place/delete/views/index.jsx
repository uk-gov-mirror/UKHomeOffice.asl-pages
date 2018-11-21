import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ModelSummary,
  FormControls,
  Header
} from '@asl/components';
import { TextArea } from '@ukhomeoffice/react-components';
import formatters from '../../formatters';

const DeletePage = ({
  model,
  csrfToken
}) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Header title={<h1><Snippet>pages.place.delete</Snippet></h1>} />
        <ModelSummary formatters={formatters} />
        <hr />
        <form method="post">
          <input type="hidden" name="delete" value="true" />
          <TextArea
            label={<Snippet>fields.comments.label</Snippet>}
            value={model.comments}
            name="comments"
          />
          <input type="hidden" name="_csrf" value={csrfToken} />
          <FormControls />
        </form>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ model, static: { csrfToken } }) => ({ model, csrfToken });

export default connect(mapStateToProps)(DeletePage);
