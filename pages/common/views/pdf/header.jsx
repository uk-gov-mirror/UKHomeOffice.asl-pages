import React, { Fragment } from 'react';
import moment from 'moment';
import Wrapper from './wrapper';
import StatusBanner from './status-banner';

const format = date => moment(date).format('DD MMM YY');

const Header = ({ model, licenceType, nonce }) => (
  <Wrapper name="header" nonce={nonce}>
    <header>
      <StatusBanner licence={model} licenceType={licenceType} />

      <p className="float-left">OFFICIAL - SENSITIVE</p>

      <p className="float-right">
        <Fragment>{licenceType.toUpperCase()} number: <strong>{model.licenceNumber}</strong></Fragment>

        <Fragment> | Granted: <strong>{format(model.issueDate)}</strong></Fragment>

        { ['pil', 'pel'].includes(licenceType) &&
          <Fragment> | Last amended: <strong>{format(model.updatedAt)}</strong></Fragment>
        }

        { licenceType === 'ppl' && model.amendedDate &&
          <Fragment> | Amended: <strong>{format(model.amendedDate)}</strong></Fragment>
        }

        { licenceType === 'ppl' && model.status !== 'expired' && model.status !== 'revoked' &&
          <Fragment> | Expires: <strong>{format(model.expiryDate)}</strong></Fragment>
        }

        { model.status === 'expired' &&
          <Fragment> | Expired: <strong>{format(model.expiryDate)}</strong></Fragment>
        }

        { model.status === 'revoked' &&
          <Fragment> | Revoked: <strong>{format(model.revocationDate)}</strong></Fragment>
        }
      </p>
    </header>
  </Wrapper>
);

export default Header;
