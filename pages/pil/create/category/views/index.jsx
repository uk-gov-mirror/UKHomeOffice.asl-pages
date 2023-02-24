import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Header,
  PanelList,
  Link
} from '@asl/components';
import EstablishmentHeader from '../../../../common/components/establishment-header';

const types = ['catAF', 'catE'];

const Category = ({ type }) => {
  return <Fragment>
    <h2><Snippet>{`${type}.title`}</Snippet></h2>
    <p><Snippet>{`${type}.subtitle`}</Snippet></p>
    {
      type !== 'catE' && (
        <Link
          page="pil"
          path="create"
          className="govuk-button"
          label={<Snippet>buttons.apply</Snippet>}
        />
      )
    }
  </Fragment>;
};

const Index = ({ establishment }) => (
  <Fragment>
    <Header
      title={<Snippet>pages.pil.categories</Snippet>}
      subtitle={<EstablishmentHeader establishment={establishment}/>}
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
