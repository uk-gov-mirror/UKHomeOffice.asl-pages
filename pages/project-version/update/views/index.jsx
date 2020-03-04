import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import ProjectStatusBanner from '../../components/project-status-banner';

const Project = ({ project, version, establishment }) => {
  return (<Fragment>
    <ProjectStatusBanner model={project} version={version} />
    <div id="ppl-drafting-tool"></div>
  </Fragment>
  );
};

const mapStateToProps = ({ static: { project, version, establishment } }) => ({ project, version, establishment });

export default connect(mapStateToProps)(Project);
