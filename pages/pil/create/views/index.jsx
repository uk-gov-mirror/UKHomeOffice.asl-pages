import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ApplyChanges,
  Header
} from '@asl/components';

const types = ['catAF', 'catE'];

const Index = ({ establishment }) => (
  <Fragment>
    <Header
      title={<Snippet>pages.pil.categories</Snippet>}
      subtitle={establishment.name}
    />
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
