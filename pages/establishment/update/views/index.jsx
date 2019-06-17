import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  FormLayout,
  Header
} from '@asl/components';
import InProgressWarning from '../../../common/components/in-progress-warning';

const Page = ({ openTask }) => {
  if (openTask) {
    return <InProgressWarning task={openTask} />;
  }

  return (
    <FormLayout>
      <Header title={<Snippet>pages.establishment.edit</Snippet>} />
    </FormLayout>
  );
};

const mapStateToProps = ({ static: { openTask } }) => ({ openTask });

export default connect(mapStateToProps)(Page);
