import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import LicenceStatusBanner from '../../../common/components/licence-status-banner';

const Project = ({ project, version, establishment }) => {
  return (<Fragment>
    <h3 className="establishment-name">{establishment.name}</h3>
    <LicenceStatusBanner licence={project} version={version} licenceType="ppl" />
    <div id="ppl-drafting-tool"></div>
  </Fragment>
  );
};

const mapStateToProps = ({ static: { project, version, establishment } }) => ({ project, version, establishment });

export default connect(mapStateToProps)(Project);
