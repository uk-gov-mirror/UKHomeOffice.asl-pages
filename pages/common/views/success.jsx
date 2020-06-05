import React from 'react';
import { useSelector } from 'react-redux';
import { Panel, Snippet, Link } from '@asl/components';

const Index = ({ onwardLink }) => {
  const profile = useSelector(state => state.static.profile);
  const subtitle = <Snippet optional email={profile && profile.email}>{`success.subtitle`}</Snippet>;
  const nextSteps = <Snippet optional>{`success.body`}</Snippet>;

  return <div className="govuk-grid-row">
    <div className="govuk-grid-column-two-thirds">
      <Panel title={<Snippet>{`success.title`}</Snippet>} className="green-bg">
        {
          subtitle && <h2>{ subtitle }</h2>
        }
      </Panel>

      {
        nextSteps && (
          <div className="what-next">
            <h2><Snippet>success.whatNext.title</Snippet></h2>
            <p>{ nextSteps }</p>
          </div>
        )
      }

      {
        onwardLink || <Link page="dashboard" label={<Snippet>breadcrumbs.dashboard</Snippet>} />
      }
    </div>
  </div>;
};

export default Index;
