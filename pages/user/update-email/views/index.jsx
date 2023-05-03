import React from 'react';
import { connect } from 'react-redux';
import {
  FormLayout,
  Header,
  Snippet
} from '@ukhomeoffice/asl-components';
import InProgressWarning from '../../../common/components/in-progress-warning';
import { canUpdateModel } from '../../../../lib/utils';

const Page = ({ model, profile }) => {
  if (!canUpdateModel(model)) {
    return <InProgressWarning task={model.openTasks[0]} />;
  }

  return (
    <FormLayout>
      <Header title={<Snippet>title</Snippet>} />
      <p><Snippet>email-guidance</Snippet></p>
      <h3><Snippet>fields.email.current</Snippet></h3>
      <p>{profile.email}</p>
    </FormLayout>
  );
};

const mapStateToProps = ({ model, static: { profile } }) => ({ model, profile });

export default connect(mapStateToProps)(Page);
