import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';

const links = [
  'pil.dashboard.details',
  'pil.dashboard.training',
  'pil.dashboard.exemptions',
  'pil.dashboard.categories'
];

const Index = () => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1>
        <Snippet>pil.dashboard.title</Snippet>
      </h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <ul className="dashboard">
          {links.map(link => (
            <li key={link}>
              <Link label={<Snippet>{`${link}.title`}</Snippet>} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Fragment>
);

export default Index;
