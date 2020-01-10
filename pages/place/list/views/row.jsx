import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import {
  Snippet,
  Controls
} from '@asl/components';

const ExpandableRow = ({ model, schema, allowedActions }) => {
  return <div className="govuk-grid-row">
    <div className={classnames({
      'govuk-grid-column-one-quarter': model.restrictions,
      'govuk-grid-column-full': !model.restrictions
    })}>
      {
        allowedActions.includes('place.update') && <Controls item={model.id} />
      }
    </div>
    {
      model.restrictions && (
        <div className="govuk-grid-column-two-thirds">
          <h3>{<Snippet>fields.restrictions.label</Snippet>}</h3>
          <ReactMarkdown>{model.restrictions}</ReactMarkdown>
        </div>
      )
    }
  </div>;
};

const mapStateToProps = ({ static: { allowedActions } }) => ({ allowedActions });

export default connect(mapStateToProps)(ExpandableRow);
