import React from 'react';
import moment from 'moment';
import Wrapper from './wrapper';
import StatusBanner from './status-banner';

const format = date => moment(date).format('DD MMM YY');

const Header = ({ project, nonce }) => (
  <Wrapper name="header" nonce={nonce}>
    <header>
      <StatusBanner licence={project} licenceType="ppl" />
      <p className="float-left">PPL Number: <strong>{project.licenceNumber}</strong></p>
      <p className="float-right">Granted: <strong>{format(project.issueDate)}</strong> | Expires: <strong>{format(project.expiryDate)}</strong></p>
      <p className="align-center">OFFICIAL - SENSITIVE</p>
    </header>
  </Wrapper>
);

export default Header;
