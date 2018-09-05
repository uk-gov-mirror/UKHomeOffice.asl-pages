import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';

const links = ['pil.catAF', 'pil.catE'];

const Index = () => (
  <Fragment>
    <header>
      <h2>&nbsp;</h2>
      <h1>
        <Snippet>pages.pil.categories</Snippet>
      </h1>
    </header>
    <div className="grid-row">
      <div className="column-two-thirds">
        <ul className="dashboard">
          {links.map(link => (
            <li key={link}>
              <Link page="pil.dashboard" label={<Snippet>{`${link}.title`}</Snippet>} />
              <p>
                <Snippet>{`${link}.subtitle`}</Snippet>
              </p>
              <p>
                <button type="submit" className="button">
                  <Snippet>pil.buttons.applyNow</Snippet>
                </button>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Fragment>
);

export default Index;
