import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snippet from '../../common/views/containers/snippet';
import Link from '../../common/views/containers/link';

const links = [
  'establishment.details'
];

const Index = ({}) => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1>Hello</h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <ul className="dashboard">
          {/* {
            links.map(link =>
              <li key={link}>
                <Link page={link} label={<Snippet>{`pages.${link}`}</Snippet>} />
                <p><Snippet>{`dashboard.${link}.subtitle`}</Snippet></p>
              </li>
            )
          } */}
        </ul>
      </div>
    </div>
  </Fragment>
);

// const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

// export default connect(mapStateToProps)(Index);

export default Index;
