import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import get from 'lodash/get';
import { Snippet, DownloadHeader, Link } from '@asl/components';
import ProjectStatusBanner from '../../components/project-status-banner';
import getSchema from '../schema';
import Field from './components/field';

function SideNav({ sections, activeSection, setActiveSection }) {
  return (
    <nav className="sidebar-nav section-nav sticky">
      {
        Object.keys(sections)
          .map(sectionName => {
            return (
              <a
                key={sectionName}
                href={`#${sectionName}`}
                className={classnames({ active: sectionName === activeSection })}
                onClick={() => setActiveSection(sectionName)}>
                <h3>{sections[sectionName].title}</h3>
              </a>
            );
          })
      }
    </nav>
  );
}

function BottomNav({ sections, activeSection, setActiveSection }) {
  const sectionNames = Object.keys(sections);
  const activeSectionPos = sectionNames.indexOf(activeSection);
  const previousSection = activeSectionPos > 0 ? sectionNames[activeSectionPos - 1] : undefined;
  const nextSection = activeSectionPos < sectionNames.length - 1 ? sectionNames[activeSectionPos + 1] : undefined;

  return (
    <nav className="bottom-nav">
      {
        previousSection &&
          <a
            href={`#${previousSection}`}
            onClick={() => setActiveSection(previousSection)}
            className="previous">
            <strong>Previous</strong><br />
            <span>{sections[previousSection].title}</span>
          </a>
      }
      {
        nextSection &&
          <a
            href={`#${nextSection}`}
            onClick={() => setActiveSection(nextSection)}
            className="next">
            <strong>Next</strong><br />
            <span>{sections[nextSection].title}</span>
          </a>
      }
      <Link page="project.read" label="View project overview" />
    </nav>
  );
}

export default function NTS() {
  const { project, version, basename } = useSelector(state => state.static);

  const thisVersionIsGranted = project.granted && project.granted.id === version.id;
  const licenceStatus = thisVersionIsGranted ? project.status : 'inactive';
  const title = get(version, 'data.title') || 'Untitled project';
  const isTrainingLicence = get(version, 'data.training-licence', false);

  const sections = getSchema(project.schemaVersion);
  const firstSectionName = Object.keys(sections)[0];
  const [activeSection, setActiveSection] = useState(firstSectionName);

  return (
    <div id="ppl-drafting-tool" className="non-technical-summary">
      <ProjectStatusBanner model={project} version={version} />

      <DownloadHeader
        title={title}
        subtitle={<Snippet>subtitle</Snippet>}
        licenceStatus={licenceStatus}
        showPdf={false}
        showAllDownloads={true}
        basename={basename}
      >
        <dl>
          <dt>Project title</dt>
          <dd>{title}</dd>

          <dt>Project licence holder</dt>
          <dd>{`${project.licenceHolder.firstName} ${project.licenceHolder.lastName}`}</dd>

          <dt>Primary establishment</dt>
          <dd>{project.establishment.name}</dd>

          <dt>Project licence number</dt>
          <dd>{project.licenceNumber}</dd>
        </dl>
      </DownloadHeader>

      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <SideNav sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
        <div className="govuk-grid-column-two-thirds">
          {
            Object.keys(sections)
              .map(sectionName => {
                const section = sections[sectionName];
                const fields = section.fields.filter(f => isTrainingLicence ? f.training !== false : f.training !== true);

                return (
                  <section key={sectionName} className={classnames({ hidden: sectionName !== activeSection })}>
                    <h1>{section.title}</h1>
                    { section.subtitle && <h2>{section.subtitle}</h2> }
                    {
                      fields.map((field, index) => (
                        <Fragment key={index}>
                          { field.heading && <h2>{field.heading}</h2> }
                          { field.label && <h3>{field.label}</h3> }
                          <Field field={field} version={version.data} schemaVersion={project.schemaVersion} project={project} />
                        </Fragment>
                      ))
                    }
                  </section>
                );
              })
          }
          <BottomNav sections={sections} activeSection={activeSection} setActiveSection={setActiveSection} />
        </div>
      </div>
    </div>
  );
}
