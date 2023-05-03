import React from 'react';
import { connect } from 'react-redux';
import Revoke from './';
import { Field, Snippet } from '@ukhomeoffice/asl-components';

const Confirm = ({ model }) => {
  const content = model.comments || 'No remarks provided.';
  return (
    <Revoke>
      <Field title={<Snippet>fields.comments.label</Snippet>} content={content} />
    </Revoke>
  );
};

export default connect(({ model }) => ({ model }))(Confirm);
