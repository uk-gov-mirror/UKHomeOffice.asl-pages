import React from 'react';
import Wrapper from './wrapper';
import moment from 'moment';

const format = date => moment(date).format('DD MMM YY');

const Header = ({ project }) => (
  <Wrapper name="header">
    <header>
      <p className="float-left">PPL Number: <strong>{project.licenceNumber}</strong></p>
      <p className="float-right">Granted: <strong>{format(project.issueDate)}</strong> | Expires: <strong>{format(project.expiryDate)}</strong></p>
      <p className="align-center">OFFICIAL - SENSITIVE</p>
    </header>
  </Wrapper>
);

export default Header;
