import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import LicenceStatusBanner from '../../components/status-banner';

const Project = ({ project, version, establishment }) => {
  return (<Fragment>
    <h3 className="establishment-name">{establishment.name}</h3>
    <LicenceStatusBanner model={project} versionId={version} />
    <div id="ppl-drafting-tool"></div>
  </Fragment>
  );
};

const mapStateToProps = ({ static: { project, version, establishment } }) => ({ project, version, establishment });

export default connect(mapStateToProps)(Project);
