import React from 'react';
import { connect } from 'react-redux';
import {
  FormLayout,
  Header,
  Snippet
} from '@asl/components';
import InProgressWarning from '../../../common/components/in-progress-warning';

const Page = ({ model }) => {
  if (model.tasks && model.tasks.length) {
    return <InProgressWarning task={model.tasks[0]} />;
  }
  return (
    <FormLayout>
      <Header title={<Snippet>title</Snippet>} />
    </FormLayout>
  );
};

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(Page);
