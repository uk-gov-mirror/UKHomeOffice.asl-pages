import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  FormLayout,
  Header
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

const Page = ({ establishment }) => (
  <FormLayout formatters={formatters}>
    <Header
      title={<Snippet>pages.profile.invite</Snippet>}
      subtitle={establishment.name}
    />
  </FormLayout>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Page);
