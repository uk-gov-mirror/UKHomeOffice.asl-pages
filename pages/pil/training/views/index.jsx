import React from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import FormLayout from '../../../common/views/layouts/form';

const Page = () => (
  <FormLayout>
    <header>
      <h1><Snippet>title</Snippet></h1>
    </header>
  </FormLayout>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Page);
