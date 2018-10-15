import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import ApplicationConfirm from '../../../common/views/components/application-confirm';
import TrainingData from './training-data';
import ExemptionData from './exemption-data';
import ProcedureData from './procedure-data';
import { connect } from 'react-redux';

const Index = ({ establishment, profile, pil }) => {

  const sections = [
    {
      name: 'details',
      completed: true
    },
    {
      name: 'training',
      completed: profile.trainingModules.length > 0
    },
    {
      name: 'exemptions',
      completed: profile.exemptions.length > 0
    },
    {
      name: 'procedures',
      completed: pil.procedures.length > 0
    }
  ];

  const applicationComplete = sections.every(section => section.completed);

  return (
    <Fragment>
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
                          className="section-link"
                          page={`pil.${section.name}`}
                          establishment={ establishment.id }
                          pil={ pil.id }
                          profile={profile.id}
                          label={<Snippet>{`pil.${section.name}.title`}</Snippet>}
                        />
                      </h3>
                    </div>
                    <div className="govuk-grid-column-one-quarter">
                      { section.completed && <label className="status-label completed">Completed</label> }
                    </div>
                  </div>
                  { section.name === 'training' &&
                    <TrainingData establishment={ establishment } pil={ pil } profile={profile} />
                  }
                  { section.name === 'procedures' &&
                    <ProcedureData establishment={ establishment } pil={ pil } profile={profile} />
                  }
                  { section.name === 'exemptions' &&
                    <ExemptionData establishment={ establishment.id } pil={ pil.id } profile={profile} />
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

const mapStateToProps = ({ static: { establishment, profile, pil } }) => ({ establishment, profile, pil });

export default connect(mapStateToProps)(Index);
