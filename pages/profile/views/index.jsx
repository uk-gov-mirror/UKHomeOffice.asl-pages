import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import App from '../../common/views/app';

const Index = ({
  profile: {
    name,
    pil: {
      licenceNumber
    },
    qualifications,
    certifications,
    address,
    postcode,
    telephone,
    email
  },
  establishment: {
    name: establishmentName
  },
  ...props
}) => (
  <App {...props}>
    <header>
      <h2>&nbsp;</h2>
      <h1>{ name }</h1>
      <dl>
        <dt>Establishment name</dt>
        <dd>{establishmentName}</dd>

        <dt>Licence Number</dt>
        <dd>{licenceNumber}</dd>
      </dl>

      <section>
        <h3>Profile</h3>
        <dl>
          <dt>Qualifications</dt>
          <dd>{qualifications}</dd>

          <dt>Premises</dt>
          <dd></dd>
        </dl>
      </section>

      <section>
        <h3>Contact Details</h3>
        <dl>
          <dt>Professional Address</dt>
          <dd>{address}<br />{postcode}</dd>

          <dt>Telephone
        </dl>
      </section>
    </header>
  </App>
)

const mapStateToProps = ({ establishment, profile }) => ({ establishment, profile });

module.exports = connect(mapStateToProps)(Index);
