import React from 'react';
import Wrapper from './wrapper';

const Footer = () => (
  <Wrapper name="footer">
    <footer>
      <p><strong>Handling Instructions:</strong> Contains personal sensitive information, subject to confidentiality requirements under the Data Protection Act.  This should only be circulated in accordance with ASPA Guidance. All government information may be subject to an FOI request and subsequent assessment.</p>
      <p className="page-number">Page <span className="pageNumber"></span> of <span className="totalPages"></span></p>
    </footer>
  </Wrapper>
);

export default Footer;
