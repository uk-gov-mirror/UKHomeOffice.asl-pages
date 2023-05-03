import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet, Header } from '@ukhomeoffice/asl-components';
import RelatedTasks from '../../../task/list/views/related-tasks';

export default function Index() {
  const { asruUser } = useSelector(state => state.model);

  const panels = {
    details: {
      page: 'account.update',
      externalOnly: false
    },
    email: {
      page: 'account.updateEmail',
      externalOnly: false
    },
    password: {
      page: 'account.updatePassword',
      externalOnly: false
    },
    training: {
      page: 'ownTraining',
      externalOnly: true
    },
    alerts: {
      page: 'account.emailPreferences',
      externalOnly: true
    }
  };

  return (
    <Fragment>
      <Header title={<Snippet>pages.account.title</Snippet>} />

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-two-thirds">
          <ul className="panel-list">
            {
              Object.keys(panels).map(key => {
                if (asruUser && panels[key].externalOnly) {
                  return null;
                }
                return <li key={key}>
                  <Link page={panels[key].page} label={<Snippet>{`panels.${key}.link`}</Snippet>} />
                  <p><Snippet>{`panels.${key}.summary`}</Snippet></p>
                </li>;
              })
            }
          </ul>
        </div>
      </div>

      <RelatedTasks />

    </Fragment>
  );
}
