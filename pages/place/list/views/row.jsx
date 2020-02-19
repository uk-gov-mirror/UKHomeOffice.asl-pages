import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import {
  Snippet,
  Controls,
  Markdown
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
          <Markdown>{model.restrictions}</Markdown>
        </div>
      )
    }
  </div>;
};

const mapStateToProps = ({ static: { allowedActions } }) => ({ allowedActions });

export default connect(mapStateToProps)(ExpandableRow);
