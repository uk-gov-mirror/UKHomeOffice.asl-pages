import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Header,
  Form,
  WidthContainer,
  ErrorSummary
} from '@ukhomeoffice/asl-components';

const UploadHba = ({ hba, task }) => {
  let action = task.data.action;
  if (action === 'grant' && task.type === 'amendment') {
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
          <Snippet>intro</Snippet>
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
