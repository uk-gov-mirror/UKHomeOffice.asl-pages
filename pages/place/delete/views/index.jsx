import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ModelSummary,
  Header,
  ControlBar
} from '@ukhomeoffice/asl-components';
import InProgressWarning from '../../../common/components/in-progress-warning';
import { TextArea } from '@ukhomeoffice/react-components';
import formatters from '../../formatters';

const DeletePage = ({
  model,
  csrfToken
}) => {
  if (model.tasks && model.tasks.length) {
    return <InProgressWarning task={model.tasks[0]} />;
  }
  return (
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
              autoExpand={true}
              name="comments"
            />
            <ControlBar block={true}>
              <input type="hidden" name="_csrf" value={csrfToken} />
              <button type="submit" className="govuk-button"><Snippet>buttons.submit</Snippet></button>
              <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
            </ControlBar>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ model, static: { csrfToken } }) => ({ model, csrfToken });

export default connect(mapStateToProps)(DeletePage);
