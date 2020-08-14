import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, ModelSummary, Link } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';
import schema from '../schema';
import formatters from '../../formatters';

export default function Page() {
  const model = useSelector(state => state.model);
  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header
            title={<Snippet>title</Snippet>}
            subtitle={model.title}
          />
          <ModelSummary schema={schema} formatters={formatters} />
          {
            model.trainingPils.length === 0 && (
              <Fragment>
                <Warning><Snippet>warning</Snippet></Warning>
                <Link page="pils.courses.update" label={<Snippet>buttons.edit</Snippet>} />
              </Fragment>
            )
          }
        </div>
      </div>
    </Fragment>
  );
}
