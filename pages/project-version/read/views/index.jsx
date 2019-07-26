import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, LicenceStatusBanner } from '@asl/components';

const Project = ({ isActionable, taskId, project, version, establishment }) => {

  return (
    <Fragment>
      <h3 className="establishment-name">{establishment.name}</h3>
      <LicenceStatusBanner licence={project} version={version} licenceType="ppl" />
      <div id="ppl-drafting-tool"></div>
      {
        isActionable && (
          <Link
            className="govuk-button"
            page="task.read"
            taskId={taskId}
            label="Next steps"
          />
        )
      }
    </Fragment>
  )
  ;
};

const mapStateToProps = ({ static: { isActionable, taskId, project, version, establishment } }) => ({ isActionable, taskId, project, version, establishment });

export default connect(mapStateToProps)(Project);
