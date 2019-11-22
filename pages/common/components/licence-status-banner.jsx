import React, { Component, Fragment } from 'react';
import { Snippet, Link } from '@asl/components';
import classnames from 'classnames';
import formatDate from 'date-fns/format';

class LicenceStatusBanner extends Component {
  componentDidMount() {
    this.setState({ open: false });
  }

  toggle() {
    return this.setState({ open: !this.state.open });
  }

  isOpen() {
    return !this.state || this.state.open;
  }

  renderDates() {
    const {
      status,
      issueDate,
      revocationDate,
      expiryDate
    } = this.props.licence;

    const dateFormat = this.props.dateFormat;

    if (status !== 'revoked' && status !== 'expired') {
      return null;
    }

    return <ul className="licence-dates">
      <li>Granted: <span className="date">{formatDate(issueDate, dateFormat)}</span></li>
      {
        status === 'revoked' && <li>Revoked: <span className="date">{formatDate(revocationDate, dateFormat)}</span></li>
      }
      {
        status === 'expired' && <li>Expiry: <span className="date">{formatDate(expiryDate, dateFormat)}</span></li>
      }
    </ul>;
  }

  render() {
    const licence = this.props.licence;
    const licenceType = this.props.licenceType;
    const version = this.props.version;

    const isInactiveVersion = licence.status === 'active' && version && licence.granted && version !== licence.granted.id;

    if (licence.status === 'active' && !isInactiveVersion) {
      return null;
    }

    return (
      <div className={classnames('licence-status-banner', licence.status, { open: this.isOpen() })}>
        <header onClick={() => this.toggle()}>
          <p className="toggle-switch">
            <a href="#">{this.isOpen() ? 'Show less' : 'Show more'}</a>
          </p>
          <p className="status">
            <Snippet>{`invalidLicence.status.${licence.status}`}</Snippet>
          </p>
        </header>

        <div className={classnames('status-details', { hidden: !this.isOpen() })}>
          {
            this.renderDates()
          }
          {
            isInactiveVersion && <Fragment>
              <p><Snippet>invalidLicence.summary.ppl_active</Snippet></p>
              <p><Link page="projectVersion" versionId={this.props.licence.granted.id} label={<Snippet>{'invalidLicence.view'}</Snippet>} /></p>
            </Fragment>
          }
          {
            !isInactiveVersion && <p><Snippet>{`invalidLicence.summary.${licenceType}`}</Snippet></p>
          }
        </div>
      </div>
    );
  }
}

LicenceStatusBanner.defaultProps = {
  dateFormat: 'DD MMMM YYYY'
};

export default LicenceStatusBanner;
