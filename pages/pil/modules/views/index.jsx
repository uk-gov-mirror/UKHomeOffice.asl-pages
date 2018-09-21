import React from 'react';
import Snippet from '../../../common/views/containers/snippet';
import FormLayout from '../../../common/views/layouts/form';
import { connect } from 'react-redux';

const Page = ({ exempt }) => (
  <FormLayout>
    <header><h1>
      { exempt
        ? (
          <Snippet>pil.exemptions.title</Snippet>
        )
        : <Snippet>pil.modules.title</Snippet>
      }
    </h1>
    </header>
  </FormLayout>
);

const mapStateToProps = ({ static: { exempt } }) => ({ exempt });

export default connect(mapStateToProps)(Page);
