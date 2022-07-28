import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Panel, Snippet, Link } from '@asl/components';

const Index = ({ onwardLink }) => {
  const {
    establishment,
    taskLabel,
    taskId,
    isAsruUser,
    additionalInfo,
    projectId
  } = useSelector(state => state.static);

  return (
    <div className="govuk-grid-row success">
      <div className="govuk-grid-column-two-thirds">
        <Header
          title={taskLabel}
          subtitle={establishment.name}
        />
        {
          additionalInfo && <h2 className="additional-info">
            {
              projectId ? <Link page="project.read" establishmentId={establishment.id} projectId={projectId} label={additionalInfo}></Link>
                : additionalInfo
            }
          </h2>
        }

        <Panel title={<Snippet>success.panel.title</Snippet>} className="green-bg success" />

        <div className="what-next">
          <h2><Snippet>success.whatNext.title</Snippet></h2>
          <p><Snippet optional>success.whatNext.body</Snippet></p>
          <p><Snippet optional>{`success.whatNext.${isAsruUser ? 'internal' : 'external'}`}</Snippet></p>

          <p><Snippet>success.taskLink.before</Snippet> <Link page="task.read" label={<Snippet>success.taskLink.linkText</Snippet>} taskId={taskId} /></p>
        </div>

        {
          onwardLink || <Link page="dashboard" label={<Snippet>breadcrumbs.dashboard</Snippet>} />
        }
      </div>
    </div>
  );
};

export default Index;
