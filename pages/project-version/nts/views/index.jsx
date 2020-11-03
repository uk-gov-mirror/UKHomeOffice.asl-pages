import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import get from 'lodash/get';
import { Snippet, DownloadHeader } from '@asl/components';
import ProjectStatusBanner from '../../components/project-status-banner';
import getSchema from '../schema';
import RichText from '@asl/projects/client/components/editor';
import {
  Duration,
  FateOfAnimals,
  Keywords,
  Purpose,
  RetrospectiveDecision,
  RetrospectivePlaceholder,
  SpeciesCount,
  SpeciesTable
} from './components';

function Field({ field, version, schemaVersion, project }) {
  if (!field.name) {
    return null;
  }

  switch (field.type) {
    case 'Duration':
      return <Duration version={version.data} />
    case 'SpeciesTable':
      return <SpeciesTable version={version.data} />
    case 'SpeciesCount':
      return <SpeciesCount version={version.data} />
    case 'FateOfAnimals':
      return <FateOfAnimals version={version.data} />
    case 'Purpose':
      return <Purpose version={version.data} schemaVersion={schemaVersion} />
    case 'Keywords':
      return <Keywords version={version.data} />
    case 'RetrospectiveDecision':
      return <RetrospectiveDecision version={version.data} />
    case 'RetrospectivePlaceholder':
      return <RetrospectivePlaceholder version={version.data} project={project} field={field} />
    default:
      return <RichText value={version.data[field.name]} readOnly={true} />
  }
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

  function SideNav({ sections }) {
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
          <SideNav sections={sections} activeSection={activeSection} />
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
                          <Field field={field} version={version} schemaVersion={project.schemaVersion} project={project} />
                        </Fragment>
                      ))
                    }
                  </section>
                );
              })
          }
        </div>
      </div>
    </div>
  );
}
