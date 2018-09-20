import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import { connect } from 'react-redux';

const sections = [
  {
    name: 'pil.details',
    completed: 1
  },
  {
    name: 'pil.training',
    completed: 0
  },
  {
    name: 'pil.exemptions',
    completed: 0
  },
  {
    name: 'pil.procedures',
    completed: 0
  }
];

const Index = ({ establishment, profile, pilApplication }) => (
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
              <li key={section.name}>
                <div className="govuk-grid-row">
                  <div className="govuk-grid-column-two-thirds">
                    <h3>
                      <Link
                        className="section-link"
                        page={section.name}
                        establishment={ establishment.id }
                        pilId={ pilApplication.id }
                        profile={profile.id}
                        label={<Snippet>{`${section.name}.title`}</Snippet>}
                      />
                    </h3>
                  </div>
                  <div className="govuk-grid-column-one-third">
                    { section.completed > 0 && <label className="status-label completed">Completed</label> }
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, profile, pilApplication } }) => ({ establishment, profile, pilApplication });

export default connect(mapStateToProps)(Index);
