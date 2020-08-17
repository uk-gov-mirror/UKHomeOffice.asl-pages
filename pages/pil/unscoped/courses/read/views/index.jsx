import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Header, ModelSummary, Link, ApplyChanges } from '@asl/components';
import { getUrl } from '@asl/components/src/link';
import { Warning } from '@ukhomeoffice/react-components';
import schema from '../schema';
import formatters from '../../formatters';

export default function Page() {
  const model = useSelector(state => state.model);
  const deletePath = getUrl({ page: 'pils.courses.delete' });

  function confirmRemove(e) {
    if (window.confirm(`Are you sure you want to delete this training course?`)) {
      return true;
    }
    e.preventDefault();
  }

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
                <p className="control-panel">
                  <Link page="pils.courses.update" label={<Snippet>buttons.edit</Snippet>} />
                  <ApplyChanges
                    type="form"
                    action={deletePath}
                    method="POST"
                  >
                    <button className="link" onClick={confirmRemove}><Snippet>buttons.delete</Snippet></button>
                  </ApplyChanges>
                </p>
              </Fragment>
            )
          }
        </div>
      </div>
    </Fragment>
  );
}
