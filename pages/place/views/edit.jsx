import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import Snippet from '../../common/views/containers/snippet';
import Inset from '../../common/views/components/inset';
import Form from '../../common/views/containers/form';
import getFields from '../fields';
import { labelFromCode } from '../../common/formatters';

const formatters = {
  suitability: { mapOptions: labelFromCode },
  holding: { mapOptions: labelFromCode }
};

const fields = getFields(formatters);

const Page = ({
  ...props
}) => (
  <App {...props}>
    <header>
      <h2>&nbsp;</h2>
      <h1><Snippet>pages.place.edit</Snippet></h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <Inset>
          <p>
            <Snippet>edit.inset</Snippet>
          </p>
        </Inset>
        <Form formatters={fields} />
      </div>
    </div>
  </App>
);

const mapStateToProps = ({ item }) => ({ item });

module.exports = connect(mapStateToProps)(Page);
