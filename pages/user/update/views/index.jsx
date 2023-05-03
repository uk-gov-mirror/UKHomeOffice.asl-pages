import React from 'react';
import { connect } from 'react-redux';
import {
  FormLayout,
  Header,
  Snippet
} from '@ukhomeoffice/asl-components';
import InProgressWarning from '../../../common/components/in-progress-warning';
import { canUpdateModel } from '../../../../lib/utils';

const Page = ({ model }) => {
  if (!canUpdateModel(model)) {
    return <InProgressWarning task={model.openTasks[0]} />;
  }
  return (
    <FormLayout>
      <Header title={<Snippet>title</Snippet>} />
    </FormLayout>
  );
};

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(Page);
