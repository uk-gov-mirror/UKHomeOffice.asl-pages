import React from 'react';
import { connect } from 'react-redux';
import {
  Snippet,
  Header,
  Form,
  WidthContainer,
  ErrorSummary, Link
} from '@ukhomeoffice/asl-components';
import {
  getTypeAdjustedWording,
  isAmendment
} from './adjusted-wording';
import { getFromContentTemplate } from '../../../../lib/utils';

const UploadHba = ({ hba, task, content }) => {
  let action = task.data.action;
  const uploadType = getTypeAdjustedWording(action, task.type);
  if (isAmendment(action, task.type)) {
    action = 'update';
  }
  return (
    <WidthContainer>
      <ErrorSummary />
      <Form
        cancelLink={
          <Link
            page="task.read"
            taskId={task.id}
            label={<Snippet>actions.cancel</Snippet>}
          />
        }
        formatters={{
          upload: {
            renderContext: {
              actionContent: getFromContentTemplate(
                content,
                [`fields.upload.actionContent.${action}`, 'fields.upload.actionContent.default'],
                {action}
              )
            }
          }
        }}
      >
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={<Snippet>{`tasks.${task.data.model}.${action}`}</Snippet>}
        />
        <p>
          <Snippet
            actionContent={
              getFromContentTemplate(
                content,
                [`intro.actionContent.${action}`, 'intro.actionContent.default'],
                {action}
              )

            }
            type={uploadType}
          >
            intro.template
          </Snippet>
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

const mapStateToProps = ({ static: { task, values, url, hba, content } }) => ({
  task,
  values,
  url,
  hba,
  content
});

export default connect(mapStateToProps)(UploadHba);
