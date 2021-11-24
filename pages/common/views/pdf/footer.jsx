import React from 'react';
import moment from 'moment';
import Wrapper from './wrapper';

const Footer = ({ officialSensitive = true }) => (
  <Wrapper name="footer">
    <footer>
      {
        officialSensitive && <p><strong>Handling Instructions:</strong> Contains personal sensitive information, subject to confidentiality requirements under the Data Protection Act.  This should only be circulated in accordance with ASPA Guidance. All government information may be subject to an FOI request and subsequent assessment.</p>
      }
      <div className="footer-details">
        <p className="downloaded-timestamp">Downloaded: { moment().format('h:mma, D MMM YYYY') }</p>
        <p className="page-number">Page <span className="pageNumber"></span> of <span className="totalPages"></span></p>
      </div>
    </footer>
  </Wrapper>
);

export default Footer;
