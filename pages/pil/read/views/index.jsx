import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ModelSummary
} from '@asl/components';

const formatters = url => ({
  status: {
    format: status => {
      if (status !== 'active') {
        return <Snippet url={`${url}/edit`}>status.inactive</Snippet>;
      }
    }
  }
});

const PIL = ({ model, profile, url }) => (
  <Fragment>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <header>
          <h2>{profile.name}</h2>
          <h1><Snippet>title</Snippet></h1>
        </header>
        <ModelSummary formatters={formatters(url)} />
      </div>

      <div className="govuk-grid-column-one-third sidebar">
        <aside>

        </aside>
      </div>
    </div>

  </Fragment>
);

const mapStateToProps = ({ model, static: { profile, url } }) => ({ model, profile, url });

export default connect(mapStateToProps)(PIL);
