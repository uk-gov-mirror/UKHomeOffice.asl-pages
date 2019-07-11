import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  ApplyChanges,
  Header,
  PanelList
} from '@asl/components';

const types = ['catAF', 'catE'];

const Category = ({ type }) => {
  return <Fragment>
    <h2><Snippet>{`${type}.title`}</Snippet></h2>
    <p><Snippet>{`${type}.subtitle`}</Snippet></p>
    <ApplyChanges
      type="form"
      method="POST"
      action={`?action=${type}`}
    >
      {
        type !== 'catE' && <button className="govuk-button">
          <Snippet>buttons.apply</Snippet>
        </button>
      }
    </ApplyChanges>
  </Fragment>;
};

const Index = ({ establishment }) => (
  <Fragment>
    <Header
      title={<Snippet>pages.pil.categories</Snippet>}
      subtitle={establishment.name}
    />
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <PanelList panels={ types.map(type => <Category type={type} key={type} />) } />
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Index);
