import React, { Fragment } from 'react';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import { Header, ModelSummary, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../constants';
import formatters from '../../formatters';
import { schema } from '../../schema';

const getVersions = model => {
  const versions = {};
  if (model.draft) {
    versions.draft = model.draft;
  }
  const version = model.versions[0];
  if (version && version.status === 'submitted') {
    versions.submitted = version;
  }
  return versions;
};

const App = ({ model, establishment, canUpdate }) => {
  const openTask = model.openTasks.find(task => task.status !== 'returned-to-applicant');

  const canAmend = canUpdate && model.status === 'active' && !openTask;

  return (
    <Fragment>
      <Header
        subtitle={establishment.name}
        title={model.title || 'Untitled project'}
      />
      <ModelSummary
        model={{
          ...model,
          ...getVersions(model)
        }}
        schema={omit(schema, 'id')}
        formatters={{
          ...omit(formatters, 'title'),
          expiryDate: {
            format: date => format(date, dateFormat.medium)
          }
        }}
      />
      {
        canAmend && (
          <form method="post">
            <Button>Amend licence</Button>
          </form>
        )
      }
      {
        openTask && <Link page="task.read" taskId={openTask.id} className="govuk-button" label="View open task" />
      }
    </Fragment>
  );
};

const mapStateToProps = ({ model, static: { establishment, canUpdate } }) => ({ model, establishment, canUpdate });

export default connect(mapStateToProps)(App);
