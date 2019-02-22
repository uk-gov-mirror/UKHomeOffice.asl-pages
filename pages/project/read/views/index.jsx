import React, { Fragment } from 'react';
import omit from 'lodash/omit';
import { connect } from 'react-redux';
import { Header, ModelSummary, Link } from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../constants';
import formatters from '../../formatters';
import { schema } from '../../schema';

const App = ({ model, establishment, openTasks = [] }) => {
  const openTask = openTasks.find(task => task.status !== 'returned-to-applicant');

  return (
    <Fragment>
      <Header
        subtitle={establishment.name}
        title={model.title || 'Untitled project'}
      />
      <ModelSummary
        model={{
          ...model,
          submitted: (model.draft && model.draft.submittedAt ? model.draft : null),
          draft: (model.draft && model.draft.submittedAt === null ? model.draft : null)
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
        model.status === 'active' && !openTask && (
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

const mapStateToProps = ({ model, static: { establishment, openTasks } }) => ({ model, establishment, openTasks });

export default connect(mapStateToProps)(App);
