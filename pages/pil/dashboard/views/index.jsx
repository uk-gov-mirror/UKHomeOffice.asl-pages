import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ErrorSummary,
  Header,
  SectionList,
  Form,
  TrainingSummary
} from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { canUpdateModel } from '../../../../lib/utils';

import InProgressWarning from '../../../common/components/in-progress-warning';

import SectionDetails from './section-details';
import ProceduresDiff from '../../procedures/views/diff';
import SpeciesDiff from '../../species/views/diff';

function confirmDelete(e) {
  e.preventDefault();

  if (window.confirm('Are you sure you want to delete this draft PIL application?')) {
    e.target.submit();
  }
}

function SubmitPIL({ formFields, snippet }) {
  return (
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        {
          formFields
        }
        <Button><Snippet>{ snippet }</Snippet></Button>
      </div>
    </div>
  );
}

const Index = ({
  pil,
  establishment,
  certificates,
  exemptions,
  model,
  isAsru,
  isLicensing,
  canTransferPil,
  skipExemptions,
  skipTraining
}) => {

  const upToDate = model.update === false;
  const taskType = model.status === 'pending' ? 'application' : 'amendment';

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
      template: <ProceduresDiff before={pil} after={model} taskType={taskType} />,
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
      completed: upToDate,
      template: upToDate && (
        certificates && certificates.length > 0
          ? <TrainingSummary certificates={certificates} />
          : <em>No training added</em>
      )
    }
  ];

  const isPilTransfer = !!model.establishment.to;
  let submitSnippet = 'buttons.submit';

  if (isAsru && !isPilTransfer) {
    submitSnippet = 'buttons.submitAsAsru';

    if (isLicensing) {
      submitSnippet = 'buttons.submitAsLicensing';
    }
  }

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
      <Form detachFields submit={false}>
        <SubmitPIL snippet={submitSnippet} />
      </Form>
      {
        model.status === 'pending' && (
          <form
            action="delete"
            method="POST"
            onSubmit={confirmDelete}
          >
            <button className="link"><span>Discard draft application</span></button>
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
    skipExemptions,
    skipTraining
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
  skipExemptions,
  skipTraining
});

export default connect(mapStateToProps)(Index);
