import React from 'react';
import { useSelector } from 'react-redux';
import { ModelSummary, Header, Snippet, Link } from '@asl/components';
import RelatedTasks from '../../../task/list/views/related-tasks';
import formatters from '../../formatters';
import EstablishmentHeader from '../../../common/components/establishment-header';

function OpenTask() {
  const { openTask, canUpdate } = useSelector(state => state.static);

  if (!openTask || !canUpdate) {
    return null;
  }

  return (
    <section className="open-task">
      <h2><Snippet>{`openTask.${openTask.type}.title`}</Snippet></h2>
      <p><Snippet>{`openTask.${openTask.type}.description`}</Snippet></p>
      <Link page="task.read" taskId={openTask.id} label={<Snippet>view-task</Snippet>} className="govuk-button button-secondary" />
    </section>
  );
}

function AmendArea() {
  const model = useSelector(state => state.model);
  const { openTask, canUpdate } = useSelector(state => state.static);

  if (openTask || !canUpdate) {
    return null;
  }

  return (
    <section className="amend-area">
      <Snippet>{`action.amend.summary`}</Snippet>
      <Link
        page="place.update"
        className="govuk-button button-secondary"
        establishmentId={model.establishmentId}
        placeId={model.id}
        label={<Snippet>action.amend.button</Snippet>}
      />
    </section>
  );
}

function RemoveArea() {
  const model = useSelector(state => state.model);
  const { openTask, canUpdate } = useSelector(state => state.static);

  if (openTask || !canUpdate) {
    return null;
  }

  return (
    <section className="remove-area">
      <Snippet>{`action.remove.summary`}</Snippet>
      <Link
        page="place.delete"
        className="govuk-button button-warning"
        establishmentId={model.establishmentId}
        placeId={model.id}
        label={<Snippet>action.remove.button</Snippet>}
      />
    </section>
  );
}

const Place = function () {
  const model = useSelector(state => state.model);
  const { establishment, summarySchema, showRelatedTasks } = useSelector(state => state.static);

  return (
    <div className="approved-area">
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Header
            title={model.name}
            subtitle={<EstablishmentHeader establishment={establishment}/>}
          />
          <ModelSummary schema={summarySchema} formatters={formatters} formatNullValue={true} />
        </div>
      </div>

      <div className="licence-actions">
        <OpenTask />
        <AmendArea />
        <RemoveArea />
      </div>

      { showRelatedTasks && <RelatedTasks /> }
    </div>
  );
};

export default Place;
