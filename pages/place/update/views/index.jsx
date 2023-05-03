import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  FormLayout,
  Header
} from '@ukhomeoffice/asl-components';
import formatters from '../../formatters';
import InProgressWarning from '../../../common/components/in-progress-warning';
import { canUpdateModel } from '../../../../lib/utils';

const Page = ({ model }) => {
  if (!canUpdateModel(model)) {
    return <InProgressWarning task={model.openTasks[0]} />;
  }
  return <FormLayout formatters={formatters}>
    <Header title={<Snippet>pages.place.edit</Snippet>} />
  </FormLayout>;
};

const mapStateToProps = ({ model }) => ({ model });

export default connect(mapStateToProps)(Page);
