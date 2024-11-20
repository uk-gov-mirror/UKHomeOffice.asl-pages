import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Header, Snippet, Link, TrainingSummary } from '@ukhomeoffice/asl-components';

export default function Training() {
  const { profile, referrer, basePage } = useSelector(state => state.static, shallowEqual);
  const draftProjects = (profile.projects || []).filter(p => p.status === 'inactive');
  const activeProjects = (profile.projects || []).filter(p => p.status === 'active');
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />
      <Snippet>instruction</Snippet>
      <h2><Snippet>modules.title</Snippet></h2>
      <p className="govuk-hint"><Snippet>modules.hint</Snippet></p>
      <TrainingSummary certificates={profile.certificates} actions={true} basePage={basePage} />
      <p>
        <Link page={`${basePage}.type`} className="govuk-button" certificateId="create" label={<Snippet>modules.add</Snippet>} />
      </p>
      {
        (referrer || !!draftProjects.length) && (
          <Fragment>
            <h2><Snippet>resume</Snippet></h2>
            {
              referrer && (
                <div className="training-links">
                  <p><a href={referrer.target}>{referrer.label}</a></p>
                </div>
              )
            }
            {
              profile.pil && (
                <div className="training-links">
                  <h3><Snippet>pil</Snippet></h3>
                  <p><Link page="pil.read" pilId={profile.pil.id} label={<Snippet>pil</Snippet>}></Link></p>
                </div>
              )
            }
            {
              !!activeProjects.length && (
                <div className="training-links">
                  <h3><Snippet>active-projects</Snippet></h3>
                  {
                    activeProjects.map(project => (
                      <p key={project.id}><Link page="project.read" projectId={project.id} label={project.title || 'Untitled project'} /></p>
                    ))
                  }
                </div>
              )
            }
            {
              !!draftProjects.length && (
                <div className="training-links">
                  <h3><Snippet>draft-projects</Snippet></h3>
                  {
                    draftProjects.map(project => (
                      <p key={project.id}><Link page="project.read" projectId={project.id} label={project.title || 'Untitled project'} /></p>
                    ))
                  }
                </div>
              )
            }
          </Fragment>
        )
      }
    </Fragment>
  );
}
