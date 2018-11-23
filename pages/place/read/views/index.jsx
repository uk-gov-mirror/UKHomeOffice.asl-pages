import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ModelSummary,
  Header
} from '@asl/components';
import formatters from '../../formatters';

const Place = ({ model }) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <Header
          title={<Snippet>pages.place.list</Snippet>}
          subtitle={model.name}
        />
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
