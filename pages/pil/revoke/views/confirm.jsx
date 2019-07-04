import React from 'react';
import { connect } from 'react-redux';
import Revoke from './';
import { Field, Snippet } from '@asl/components';

const Confirm = ({ model }) => (
  <Revoke>
    <Field title={<Snippet>fields.comments.label</Snippet>} content={model.comments} />
  </Revoke>
);

export default connect(({ model }) => ({ model }))(Confirm);
