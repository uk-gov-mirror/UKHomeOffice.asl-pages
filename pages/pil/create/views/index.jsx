import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import ApplyChanges from '../../../common/views/components/apply-changes';
import { connect } from 'react-redux';

const types = ['catAF', 'catE'];

const Index = ({ establishment }) => (
  <Fragment>
    <header>
      <h2>{establishment.name}</h2>
      <h1><Snippet>pages.pil.categories</Snippet></h1>
    </header>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ul className="dashboard">
          {
            types.map(type => (
              <li key={type}>
                <h2><Snippet>{`${type}.title`}</Snippet></h2>
                <p>
                  <Snippet>{`${type}.subtitle`}</Snippet>
                </p>
                <ApplyChanges
                  type="form"
                  method="POST"
                  action={`?action=${type}`}
                >
                  <button className="govuk-button">
                    <Snippet>buttons.apply</Snippet>
                  </button>
                </ApplyChanges>

              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Index);
