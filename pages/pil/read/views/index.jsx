import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ModelSummary,
  Header
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
    <Header
      title={<Snippet>title</Snippet>}
      subtitle={profile.name}
    />
    <ModelSummary formatters={formatters(url)} />
  </Fragment>
);

const mapStateToProps = ({ model, static: { profile, url } }) => ({ model, profile, url });

export default connect(mapStateToProps)(PIL);
