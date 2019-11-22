import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ApplicationConfirm,
  ErrorSummary,
  Header,
  SectionList,
  OpenTaskWarning
} from '@asl/components';
import { Button } from '@ukhomeoffice/react-components';
import { dateFormat } from '../../../../constants';
import { formatDate, canUpdateModel } from '../../../../lib/utils';

import InProgressWarning from '../../../common/components/in-progress-warning';

import {
  certificate as certificatesSchema,
  modules as modulesSchema,
  species as speciesSchema
} from '../../training/schema';

import SectionDetails from './section-details';

function confirmDelete(e) {
  e.preventDefault();

  if (window.confirm('Are you sure you want to delete this draft PIL application?')) {
    e.target.submit();
  }
}

const Index = ({ schema, establishment, certificates, exemptions, model, isAsru, isLicensing, skipExemptions, skipTraining, csrfToken }) => {

  const sections = [
    {
      name: 'details',
      page: 'profile.read',
      completed: true
    },
    {
      name: 'establishment',
      page: 'establishment.read',
      establishment,
      completed: true
    },
    {
      name: 'procedures',
      page: 'pil.update.procedures',
      removeLink: false,
      schema: {},
      models: (model.procedures || []).map(procedure => {
        const rtn = { procedures: procedure };
        if (procedure === 'D') {
          rtn.notesCatD = model.notesCatD;
        }
        if (procedure === 'F') {
          rtn.notesCatF = model.notesCatF;
        }
        return rtn;
      }),
      addOrEdit: 'edit',
      completed: model.procedures && model.procedures.length > 0
    },
    {
      name: 'species',
      page: 'pil.update.species',
      models: model.species || [],
      addOrEdit: 'edit',
      completed: model.species && model.species.length > 0,
      template: model.species && model.species.length && (
        <ul>
          {
            (model.species || []).map((s, i) => (
              <li key={i}><strong>{s}</strong></li>
            ))
          }
        </ul>
      )
    },
    {
      name: 'training',
      page: 'pil.update.training.exempt',
      models: certificates,
      modelTitle: index => <p><strong>Certificate {index + 1}</strong></p>,
      schema: { ...certificatesSchema, ...modulesSchema, ...speciesSchema },
      formatters: {
        passDate: {
          format: date => formatDate(date, dateFormat.medium)
        },
        modules: {
          format: modules => (
            <ul>
              {
                modules.map(({ module, species }, index) =>
                  <li key={index}>
                    { module }
                  </li>
                )
              }
            </ul>
          )
        },
        species: {
          format: species => species && species.length
            ? <ul>
              {
                species.map((s, index) => <li key={index}>{s}</li>)
              }
            </ul>
            : '-'
        }
      },
      addLink: <Snippet>actions.add-certificate</Snippet>,
      completed: certificates.length > 0 || skipTraining
    },
    {
      name: 'exemptions',
      page: 'pil.update.exemptions.exempt',
      models: exemptions,
      schema: {
        module: {},
        species: {},
        description: {}
      },
      formatters: {
        species: {
          format: species => (
            <ul>{ (species || []).map((type, index) => <li key={index}>{type}</li>) }</ul>
          )
        }
      },
      addOrEdit: 'edit',
      completed: exemptions.length > 0 || skipExemptions
    }
  ];

  const submitSnippet = isLicensing ? 'buttons.submitAsLicensing' : (isAsru ? 'buttons.submitAsAsru' : 'buttons.submit');

  if (!canUpdateModel(model)) {
    return <InProgressWarning task={model.openTasks[0]} />;
  }

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <OpenTaskWarning />
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
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <SectionList sections={sections.map(s => ({ ...s, Component: SectionDetails }))} />
          <form method="POST">
            <input type="hidden" name="_csrf" value={csrfToken} />
            {
              schema.declarations
                ? <ApplicationConfirm />
                : <button className="govuk-button"><Snippet>{submitSnippet}</Snippet></button>
            }
          </form>
          {
            model.status === 'pending' && (
              <form
                action="delete"
                method="POST"
                onSubmit={confirmDelete}
              >
                <Button className="link">Discard draft application</Button>
              </form>
            )
          }
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({
  model,
  static: {
    schema,
    establishment,
    profile: {
      exemptions,
      certificates
    },
    isAsru,
    isLicensing,
    skipExemptions,
    skipTraining,
    csrfToken
  }
}) => ({
  schema,
  establishment,
  exemptions,
  certificates,
  model,
  isAsru,
  isLicensing,
  skipExemptions,
  skipTraining,
  csrfToken
});

export default connect(mapStateToProps)(Index);
