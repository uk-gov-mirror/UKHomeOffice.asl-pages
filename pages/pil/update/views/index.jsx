import React, { Fragment } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import {
  Snippet,
  ApplicationConfirm,
  ErrorSummary
} from '@asl/components';

import {
  certificate as certificatesSchema,
  modules as modulesSchema
} from '../../training/schema';

import SectionDetails from './section-details';

const Index = ({ establishment, certificates, exemptions, model, skipExemptions, skipTraining, url }) => {

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
                    { species.length > 0 && <span className="species"> ({species.join(', ')})</span> }
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

  return (
    <Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ErrorSummary />
        </div>
      </div>

      <header>
        <h2>{establishment.name}</h2>
        <h1><Snippet>pil.title</Snippet></h1>
      </header>

      <p><Snippet>pil.summary</Snippet></p>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ul className="pil-sections">
            {
              sections.map(section =>
                <li key={section.name} className={classnames('section', section.name)}><SectionDetails {...section} /></li>
              )
            }
          </ul>
          {
            applicationComplete && <ApplicationConfirm />
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
    skipTraining
  }
}) => ({ establishment, exemptions, certificates, model, skipExemptions, skipTraining });

export default connect(mapStateToProps)(Index);
