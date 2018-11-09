import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  FormLayout
} from '@asl/components';

const formatters = {
  role: {
    mapOptions: opt => {
      return {
        value: opt,
        label: <Snippet>{`fields.role.options.${opt}.label`}</Snippet>,
        hint: <Snippet optional>{`fields.role.options.${opt}.hint`}</Snippet>
      };
    }
  }
};

const Page = ({
  establishment: {
    name
  }
}) => (
  <FormLayout formatters={formatters}>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.profile.invite</Snippet></h1>
    </header>
  </FormLayout>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Page);
