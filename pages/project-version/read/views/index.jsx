import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ProjectStatusBanner from '../../components/project-status-banner';

const Project = ({ project, version }) => {

  return (
    <Fragment>
      <ProjectStatusBanner model={project} version={version} />
      <div id="ppl-drafting-tool"></div>
    </Fragment>
  );
};

const mapStateToProps = ({ model, static: { project, version } }) => ({ project, version: model });

export default connect(mapStateToProps)(Project);
