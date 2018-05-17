import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';

const Index = ({
  establishment: {
    name,
    licenceNumber,
    licenceHolder: {
      profile: {
        name: elhName
      }
    }
  },
  url,
  ...props
}) => (
  <App url={url} {...props}>
    <header>
      <h2>&nbsp;</h2>
      <h1>{ name }</h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <ul className="dashboard">
          <li><a href={`${url}/details`}>Establishment details</a></li>
          <li><a href={`${url}/places`}>Licensed premises</a></li>
        </ul>
      </div>
      <div className="column-one-third establishment-summary">
        <aside>
          <dl>
            <dt>Licence number</dt>
            <dd>{ licenceNumber }</dd>

            <dt>Licence holder</dt>
            <dd>{ elhName }</dd>
          </dl>
        </aside>
      </div>
    </div>
  </App>
);

const mapStateToProps = ({ url, establishment }) => ({ url, establishment });

module.exports = connect(mapStateToProps)(Index);
