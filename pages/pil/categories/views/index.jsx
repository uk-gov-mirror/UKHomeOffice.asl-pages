import React, { Fragment } from 'react';
import Snippet from '../../../common/views/containers/snippet';
import Link from '../../../common/views/containers/link';
import { LinkButton } from '@ukhomeoffice/react-components';
import { connect } from 'react-redux';

const links = ['pil.catAF', 'pil.catE'];

const Index = ({ establishment, pilApplication, profile }) => (
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
                <h2>
                  <Link
                    page="pil.dashboard"
                    profile={profile.id}
                    pilId={pilApplication.id}
                    label={<Snippet>{`${link}.title`}</Snippet>}
                  />
                </h2>
                <p>
                  <Snippet>{`${link}.subtitle`}</Snippet>
                </p>
                <LinkButton type="button" href={`/e/${establishment.id}/people/${profile.id}/pil/${pilApplication.id}`}>
                  <Snippet>pil.buttons.applyNow</Snippet>
                </LinkButton>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, pilApplication, profile } }) => ({ establishment, pilApplication, profile });

export default connect(mapStateToProps)(Index);
