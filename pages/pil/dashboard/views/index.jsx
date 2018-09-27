import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import TrainingData from './training-data';
import { connect } from 'react-redux';

const Index = ({ establishment, profile, pilApplication }) => {
  const sections = [
    {
      name: 'details',
      completed: true
    },
    {
      name: 'training',
      completed: profile.certificates.length > 0
    },
    {
      name: 'exemptions',
      completed: false
    },
    {
      name: 'procedures',
      completed: false
    }
  ];

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
                    <div className="govuk-grid-column-two-thirds">
                      <h3>
                        <Link
                          className="section-link"
                          page={`pil.${section.name}`}
                          establishment={ establishment.id }
                          pil={ pilApplication.id }
                          profile={profile.id}
                          label={<Snippet>{`pil.${section.name}.title`}</Snippet>}
                        />
                      </h3>
                    </div>
                    <div className="govuk-grid-column-one-third">
                      { section.completed && <label className="status-label completed">Completed</label> }
                    </div>
                  </div>
                  { section.name === 'training' &&
                    <TrainingData establishment={ establishment.id } pil={ pilApplication.id } profile={profile} />
                  }
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ static: { establishment, profile, pilApplication } }) => ({ establishment, profile, pilApplication });

export default connect(mapStateToProps)(Index);
