import React from 'react';
import { connect } from 'react-redux';
import { Snippet, FormLayout, Header } from '@ukhomeoffice/asl-components';

const RevokeProject = ({ project, children }) => (
  <FormLayout>
    <Header title={<Snippet>title</Snippet>} subtitle={project.title} />
    { children }
  </FormLayout>
);

const mapStateToProps = ({ static: { project } }) => ({ project });

export default connect(mapStateToProps)(RevokeProject);
