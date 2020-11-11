import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import get from 'lodash/get';
import { Header, Snippet, Tabs } from '@asl/components';
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

export default function ProjectLandingPage() {
  const project = useSelector(state => state.model);
  const { establishment } = useSelector(state => state.static);
  const isGranted = !!project.granted;
  const snippetPath = `tabs.${isGranted ? 'granted' : 'application'}`;

  const sections = {
    overview: <Snippet>{`${snippetPath}.overview`}</Snippet>,
    manage: <Snippet>{`${snippetPath}.manage`}</Snippet>,
    history: <Snippet>{`${snippetPath}.history`}</Snippet>,
    downloads: <Snippet>{`${snippetPath}.downloads`}</Snippet>
  };

  const workflowConnectionError = useSelector(state => state.static.workflowConnectionError);
  const datatable = useSelector(state => state.datatable);
  const { additionalAvailability } = useSelector(state => state.static);
  const hasHistory = get(datatable, 'pagination.totalCount') > 0;

  if (workflowConnectionError || additionalAvailability || !hasHistory) {
    delete sections.history;
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
      <Header
        subtitle={establishment.name}
        title={project.title || 'Untitled project'}
      />

      <SectionNav sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />

      { activeSection === 'overview' && <Overview /> }
      { activeSection === 'manage' && <Manage /> }
      { activeSection === 'history' && sections.history && <History /> }
      { activeSection === 'downloads' && <Downloads /> }
    </div>
  );
}
