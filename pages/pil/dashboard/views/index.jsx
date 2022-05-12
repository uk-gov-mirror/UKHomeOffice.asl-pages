import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ErrorSummary,
  Header,
  SectionList,
  Form,
  TrainingSummary
} from '@asl/components';
import { canUpdateModel } from '../../../../lib/utils';

import InProgressWarning from '../../../common/components/in-progress-warning';

import SectionDetails from './section-details';
import ProceduresDiff from '../../procedures/views/diff';
import SpeciesDiff from '../../species/views/diff';

const Index = ({
  pil,
  establishment,
  certificates,
  model,
  canTransferPil,
  trainingUpToDate
}) => {
  const taskType = model.status === 'pending' ? 'application' : 'amendment';

  const beforeProcs = pil.procedures.map(p => (p.key ? p : { key: p }));
  const afterProcs = model.procedures.map(p => (p.key ? p : { key: p }));

  const [disableDiscard, setDisableDiscard] = useState(false);

  function confirmDelete(e) {
    e.preventDefault();

    if (window.confirm('Are you sure you want to delete this draft PIL application?')) {
      setDisableDiscard(true);
      e.target.submit();
    }
  }

  const sections = [
    {
      name: 'details',
      page: 'profile.read',
      completed: true
    },
    {
      name: 'establishment',
      page: 'establishment.read',
      template: <p>{ model.establishment.to ? model.establishment.to.name : model.establishment.from.name }</p>,
      addOrEdit: 'edit',
      completed: true,
      canTransferPil
    },
    {
      name: 'procedures',
      page: 'pil.update.procedures',
      removeLink: false,
      models: model.procedures || [],
      template: <ProceduresDiff before={beforeProcs} after={afterProcs} taskType={taskType} beforePil={pil} afterPil={model} />,
      addOrEdit: 'edit',
      completed: model.procedures && model.procedures.length > 0
    },
    {
      name: 'species',
      page: 'pil.update.species',
      models: model.species || [],
      template: <SpeciesDiff before={pil} after={model} taskType={taskType} />,
      addOrEdit: 'edit',
      completed: model.species && model.species.length > 0
    },
    {
      name: 'training',
      page: 'pil.update.training',
      completed: trainingUpToDate,
      template: trainingUpToDate && (
        certificates && certificates.length > 0
          ? <TrainingSummary certificates={certificates} />
          : <em>No training added</em>
      )
    }
  ];

  if (!canUpdateModel(model)) {
    return <InProgressWarning task={model.openTasks[0]} />;
  }

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <Header
        title={
          model.status === 'active'
            ? <Snippet>pil.titleAmend</Snippet>
            : <Snippet>pil.title</Snippet>
        }
        subtitle={establishment.name}
      />
      <p><Snippet>pil.summary</Snippet></p>
      <SectionList sections={sections.map(s => ({ ...s, Component: SectionDetails }))} />
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <Form />
        </div>
      </div>
      {
        model.status === 'pending' && (
          <form
            action="delete"
            method="POST"
            onSubmit={confirmDelete}
            className="control-panel"
          >
            <button className="link" disabled={disableDiscard}><span>Discard draft application</span></button>
          </form>
        )
      }
    </Fragment>
  );
};

const mapStateToProps = ({
  model,
  static: {
    pil,
    establishment,
    profile: {
      exemptions,
      certificates
    },
    isAsru,
    isLicensing,
    canTransferPil,
    trainingUpToDate
  }
}) => ({
  pil,
  establishment,
  exemptions,
  certificates,
  model,
  isAsru,
  isLicensing,
  canTransferPil,
  trainingUpToDate
});

export default connect(mapStateToProps)(Index);
