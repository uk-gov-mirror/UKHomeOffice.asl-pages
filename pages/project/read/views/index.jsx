import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { DocumentHeader, Snippet, Tabs } from '@asl/components';
import ProjectStatusBanner from '../../../project-version/components/project-status-banner';
import Overview from './sections/overview';
import Manage from './sections/manage';
import History from './sections/history';
import Downloads from './sections/downloads';

function SectionNav({ sections, activeSection, setActiveSection }) {
  const activeTab = Object.keys(sections).indexOf(activeSection);

  return (
    <Tabs active={activeTab}>
      {
        Object.keys(sections)
          .map(sectionName => {
            return (
              <a
                key={sectionName}
                href={`#${sectionName}`}
                onClick={() => setActiveSection(sectionName)}>
                {sections[sectionName]}
              </a>
            );
          })
      }
    </Tabs>
  );
}

function hasHistory() {
  const workflowConnectionError = useSelector(state => state.static.workflowConnectionError);
  if (workflowConnectionError) {
    return false;
  }
  const datatable = useSelector(state => state.datatable);
  return get(datatable, 'pagination.totalCount') > 0;
}

function hasPreviousVersions() {
  const project = useSelector(state => state.model);
  const previousVersions = project.versions.filter(v => v.status === 'granted' && v.id !== project.granted.id && !v.isLegacyStub);
  return previousVersions.length > 0;
}

export default function ProjectLandingPage() {
  const project = useSelector(state => state.model);
  const snippetPath = `tabs.${project.granted ? 'granted' : 'application'}`;

  const sections = {
    overview: <Snippet>{`${snippetPath}.overview`}</Snippet>,
    manage: <Snippet>{`${snippetPath}.manage`}</Snippet>,
    history: <Snippet>{`${snippetPath}.history`}</Snippet>,
    downloads: <Snippet>{`${snippetPath}.downloads`}</Snippet>
  };

  const { additionalAvailability } = useSelector(state => state.static);

  if (additionalAvailability || (!hasHistory() && !hasPreviousVersions())) {
    delete sections.history;
  }

  if (project.isLegacyStub) {
    delete sections.downloads;
  }

  const sectionNames = Object.keys(sections);
  const firstSectionName = sectionNames[0];
  const [activeSection, setActiveSection] = useState(firstSectionName);

  useEffect(() => {
    const hash = (window.location.hash || '').substring(1);
    if (hash && sectionNames.includes(hash)) {
      setActiveSection(hash);
    }
  });

  return (
    <div className="project-landing-page">
      <ProjectStatusBanner model={project} version={project.granted || project.versions[0]} />

      <DocumentHeader
        title={<Snippet>{`page.title.${project.status === 'inactive' ? 'application' : 'granted'}`}</Snippet>}
        subtitle={project.title || 'Untitled project'}
      />

      <SectionNav sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />

      { activeSection === 'overview' && sections.overview && <Overview /> }
      { activeSection === 'manage' && sections.manage && <Manage /> }
      { activeSection === 'history' && sections.history && <History /> }
      { activeSection === 'downloads' && sections.downloads && <Downloads /> }
    </div>
  );
}
