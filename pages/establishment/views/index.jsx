import React from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';
import Snippet from '../../common/views/containers/snippet';

const Index = ({
  establishment: {
    name,
    licenceNumber,
    pelh
  },
  url,
  ...props
}) => (
  <App {...props}>
    <header>
      <h2>&nbsp;</h2>
      <h1>{ name }</h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <ul className="dashboard">
          <li><a href={`${url}/details`}><Snippet>pages.details</Snippet></a></li>
          <li><a href={`${url}/people`}><Snippet>pages.people</Snippet></a></li>
          <li><a href={`${url}/places`}><Snippet>pages.places</Snippet></a></li>
        </ul>
      </div>
      <div className="column-one-third establishment-summary">
        <aside>
          <dl>
            <dt><Snippet>licenceNumber</Snippet></dt>
            <dd>{ licenceNumber }</dd>

            <dt><Snippet>licenceHolder</Snippet></dt>
            <dd><a href={`${url}/profile/${pelh.id}`}>{ pelh.name }</a></dd>
          </dl>
        </aside>
      </div>
    </div>
  </App>
);

const mapStateToProps = ({ url, establishment }) => ({ url, establishment });

module.exports = connect(mapStateToProps)(Index);
