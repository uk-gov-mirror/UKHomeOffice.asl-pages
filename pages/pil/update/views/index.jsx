import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ApplicationConfirm,
  ErrorSummary,
  Header,
  SectionList
} from '@asl/components';

import InProgressWarning from '../../../common/components/in-progress-warning';

import {
  certificate as certificatesSchema,
  modules as modulesSchema
} from '../../training/schema';

import SectionDetails from './section-details';

const Index = ({ establishment, certificates, exemptions, model, skipExemptions, skipTraining, csrfToken }) => {

  const sections = [
    {
      name: 'details',
      page: 'profile.view',
      completed: true
    },
    {
      name: 'training',
      page: 'pil.training.exempt',
      models: certificates,
      schema: { ...certificatesSchema, ...modulesSchema },
      formatters: {
        modules: {
          format: modules => (
            <ul>
              {
                modules.map(({ module, species }, index) =>
                  <li key={index}>
                    { module }
                    { species && species.length > 0 && <span className="species"> ({species.join(', ')})</span> }
                  </li>
                )
              }
            </ul>
          )
        }
      },
      completed: certificates.length > 0 || skipTraining
    },
    {
      name: 'exemptions',
      page: 'pil.exemptions.exempt',
      models: exemptions,
      schema: {
        module: {},
        description: {}
      },
      addOrEdit: 'edit',
      completed: exemptions.length > 0 || skipExemptions
    },
    {
      name: 'procedures',
      page: 'pil.procedures',
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
    }
  ];

  const applicationComplete = sections.every(section => section.completed);

  if (model.tasks && model.tasks.length) {
    return <InProgressWarning task={model.tasks[0]} />
  }

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <Header
        title={<Snippet>pil.title</Snippet>}
        subtitle={establishment.name}
      />
      <p><Snippet>pil.summary</Snippet></p>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <SectionList sections={sections.map(s => ({ ...s, Component: SectionDetails }))} />
          {
            applicationComplete &&
            <form method="POST">
              <input type="hidden" name="_csrf" value={csrfToken} />
              <ApplicationConfirm />
            </form>
          }
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({
  model,
  static: {
    establishment,
    profile: {
      exemptions,
      certificates
    },
    skipExemptions,
    skipTraining,
    csrfToken
  }
}) => ({ establishment, exemptions, certificates, model, skipExemptions, skipTraining, csrfToken });

export default connect(mapStateToProps)(Index);
