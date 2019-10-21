import React from 'react';
import { connect } from 'react-redux';
import {
  FormLayout,
  Header,
  Snippet
} from '@asl/components';
import InProgressWarning from '../../../common/components/in-progress-warning';
import { canUpdateModel } from '../../../../lib/utils';

const Page = ({ model, profile }) => {
  if (!canUpdateModel(model)) {
    return <InProgressWarning task={model.openTasks[0]} />;
  }

  return (
    <FormLayout>
      <Header title={<Snippet>title</Snippet>} />
      <h3>Your current email address</h3>
      <p>{profile.email}</p>
    </FormLayout>
  );
};

const mapStateToProps = ({ model, static: { profile } }) => ({ model, profile });

export default connect(mapStateToProps)(Page);
