import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import { LinkButton } from '@ukhomeoffice/react-components';
import { connect } from 'react-redux';

const links = ['catAF', 'catE'];

const Index = ({ establishment, pilApplication, profile, url }) => (
  <Fragment>
    <header>
      <h2>{establishment.name}</h2>
      <h1><Snippet>pages.pil.categories</Snippet></h1>
    </header>
    <div className="govuk-grid-row">
      <div className="govuk-grid-column-two-thirds">
        <ul className="dashboard">
          {
            links.map(link => (
              <li key={link}>
                <h2><Snippet>{`${link}.title`}</Snippet></h2>
                <p>
                  <Snippet>{`${link}.subtitle`}</Snippet>
                </p>
                <LinkButton type="button" href={`${url}?action=${link}`}>
                  <Snippet>buttons.apply</Snippet>
                </LinkButton>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, pilApplication, profile, url } }) => ({ establishment, pilApplication, profile, url });

export default connect(mapStateToProps)(Index);
