import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from '@asl/components';
import ProjectStatusBanner from '../../components/project-status-banner';

const Project = ({ isActionable, taskId, project, version, establishment }) => {

  return (
    <Fragment>
      <ProjectStatusBanner model={project} version={version} />
      <div id="ppl-drafting-tool"></div>
      {
        isActionable && (
          <p className="next-steps">
            <Link
              className="govuk-button"
              page="task.read"
              taskId={taskId}
              label="Next steps"
            />
            <span className="status-message"></span>
          </p>
        )
      }
    </Fragment>
  )
  ;
};

const mapStateToProps = ({ model, static: { isActionable, taskId, project, version, establishment } }) => ({ isActionable, taskId, project, version: model, establishment });

export default connect(mapStateToProps)(Project);
