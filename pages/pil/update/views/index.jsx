import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import ApplicationConfirm from '../../../common/views/components/application-confirm';
import ErrorSummary from '../../../common/views/containers/error-summary';
import TrainingData from './training-data';
import ExemptionData from './exemption-data';
import ProcedureData from './procedure-data';

const Index = ({ establishment, profile, model, skipExemptions, skipTraining, url }) => {

  const sections = [
    {
      name: 'details',
      page: 'profile.view',
      completed: true
    },
    {
      name: 'training',
      page: 'pil.training.exempt',
      completed: profile.certificates.length > 0 || skipTraining
    },
    {
      name: 'exemptions',
      completed: profile.exemptions.length > 0 || skipExemptions
    },
    {
      name: 'procedures',
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
        <p><Snippet>pil.summary</Snippet></p>
      </header>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ul className="pil-sections">
            {
              sections.map(section => (
                <li key={section.name} className="section">
                  <div className="govuk-grid-row">
                    <div className="govuk-grid-column-three-quarters">
                      <h3>
                        <Link
                          page={section.page}
                          label={<Snippet>{`pil.${section.name}.title`}</Snippet>}
                          path={section.name}
                        />
                      </h3>
                    </div>
                    <div className="govuk-grid-column-one-quarter">
                      { section.completed && <label className="status-label completed">Completed</label> }
                    </div>
                  </div>
                  { section.name === 'training' &&
                    <TrainingData url={url} profile={profile} />
                  }
                  { section.name === 'exemptions' &&
                    <ExemptionData url={url} skipExemptions={skipExemptions} profile={profile} />
                  }
                  { section.name === 'procedures' &&
                    <ProcedureData pil={model} />
                  }
                </li>
              ))
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
    profile,
    skipExemptions,
    skipTraining,
    url
  }
}) => ({ establishment, profile, model, skipExemptions, skipTraining, url });

export default connect(mapStateToProps)(Index);
