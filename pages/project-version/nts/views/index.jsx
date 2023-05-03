import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';
import get from 'lodash/get';
import { Snippet, DocumentHeader, Link } from '@ukhomeoffice/asl-components';
import ProjectStatusBanner from '../../components/project-status-banner';
import getSchema from '../schema';
import Field from './components/field';
import RaSummary from './components/ra-summary';
import { formatDate } from '../../../../lib/utils';
import { dateFormat } from '../../../../constants';

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
      <Link page="project.read" label="Go to project overview" />
    </nav>
  );
}

export default function NTS() {
  const { project, version } = useSelector(state => state.static);
  const grantedRa = project.grantedRa;
  const versionData = version.data;
  versionData.raCompulsory = version.raCompulsory;

  const title = get(version, 'data.title') || 'Untitled project';
  const isTrainingLicence = get(version, 'data.training-licence', false);

  const sections = getSchema(project.schemaVersion);
  const firstSectionName = Object.keys(sections)[0];
  const [activeSection, setActiveSection] = useState(firstSectionName);

  return (
    <div id="ppl-drafting-tool" className="non-technical-summary">
      <ProjectStatusBanner model={project} version={version} />

      <DocumentHeader
        title={title}
        subtitle={<Snippet includesRa={grantedRa}>subtitle</Snippet>}
        detailsLabel="details and downloads"
      >
        <dl>
          <dt>Project title</dt>
          <dd>{title}</dd>

          <dt>Licence holder</dt>
          <dd><Link page="profile.read" establishmentId={project.establishment.id} profileId={version.licenceHolder.id} label={`${version.licenceHolder.firstName} ${version.licenceHolder.lastName}`} /></dd>

          <dt>Licence number</dt>
          <dd>{project.licenceNumber}</dd>

          <dt>Primary establishment</dt>
          <dd><Link page="establishment.dashboard" establishmentId={project.establishment.id} label={project.establishment.name} /></dd>

          { project.expiryDate &&
            <Fragment>
              <dt>Expiry date</dt>
              <dd>{formatDate(project.expiryDate, dateFormat.long)}</dd>
            </Fragment>
          }

          { project.raDate &&
            <Fragment>
              <dt>Retrospective assessment due</dt>
              <dd>{formatDate(project.raDate, dateFormat.long)}</dd>
            </Fragment>
          }

          { project.amendedDate &&
            <Fragment>
              <dt>Last amended</dt>
              <dd>{formatDate(project.amendedDate, dateFormat.long)}</dd>
            </Fragment>
          }

          <dt>Downloads</dt>
          <dd>
            <ul>
              <li>
                <Link
                  page="projectVersion.ntsPdf"
                  label={<Snippet>{`action.download.${project.grantedRa ? 'pdfRa' : 'pdf'}`}</Snippet>}
                  versionId={version.id}
                />
              </li>
              {
                project.draftRa &&
                <li>
                  <Link
                    page="projectVersion.ntsPdf"
                    label={<Snippet>action.download.pdfDraftRa</Snippet>}
                    versionId={version.id}
                    query={{ draftRa: true }}
                  />
                </li>
              }
            </ul>
          </dd>
        </dl>
      </DocumentHeader>

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
                          {
                            (field.type !== 'RetrospectivePlaceholder' || !grantedRa) &&
                              <Field
                                field={field}
                                version={versionData}
                                schemaVersion={project.schemaVersion}
                                project={project}
                              />
                          }
                          {
                            field.raSummary && <RaSummary fields={field.raSummary} project={project} />
                          }
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
