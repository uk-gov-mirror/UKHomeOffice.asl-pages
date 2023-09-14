import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Header,
  Form,
  WidthContainer,
  ErrorSummary
} from '@ukhomeoffice/asl-components';
import {
  getActionAdjustedWording,
  getTypeAdjustedWording,
  isAmendment
} from './adjusted-wording';

const UploadHba = ({ hba, task }) => {
  let action = task.data.action;
  const uploadAction = getActionAdjustedWording(action, task.type);
  const uploadType = getTypeAdjustedWording(action, task.type);
  if (isAmendment(action, task.type)) {
    action = 'update';
  }
  return (
    <WidthContainer>
      <ErrorSummary />
      <Form>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
        />
        <p>
          <Snippet action={uploadAction} type={uploadType}>intro</Snippet>
        </p>
        {hba && (
          <p>
            <strong>
              <Snippet>fields.hba.label</Snippet>
            </strong>
            <br />
            <a href={`/attachment/${hba.hbaToken}`} download={`${hba.hbaFilename}`}>{hba.hbaFilename}</a>{' '}
          </p>
        )}
      </Form>
    </WidthContainer>
  );
};

const mapStateToProps = ({ static: { task, values, url, hba } }) => ({
  task,
  values,
  url,
  hba
});

export default connect(mapStateToProps)(UploadHba);
