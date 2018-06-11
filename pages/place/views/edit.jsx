import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import Snippet from '../../common/views/containers/snippet';
import Inset from '../../common/views/components/inset';
import FormLayout from '../../common/views/layouts/form';
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
    <FormLayout fields={fields}>
      <header>
        <h2>&nbsp;</h2>
        <h1><Snippet>pages.place.edit</Snippet></h1>
      </header>
      <Inset>
        <p>
          <Snippet>edit.inset</Snippet>
        </p>
      </Inset>
    </FormLayout>
  </App>
);

const mapStateToProps = ({ item }) => ({ item });

module.exports = connect(mapStateToProps)(Page);
