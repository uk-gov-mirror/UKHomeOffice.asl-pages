import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import ModelSummary from '../../../common/views/containers/model-summary';
import formatters from '../../formatters';

const Place = ({ model }) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <header>
          <h2>{model.name}</h2>
          <h1><Snippet>pages.place.list</Snippet></h1>
        </header>
        <ModelSummary formatters={formatters} />
      </div>

      <div className="govuk-grid-column-one-third sidebar">
        <aside>

        </aside>
      </div>
    </div>

  </Fragment>
);

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(Place);
