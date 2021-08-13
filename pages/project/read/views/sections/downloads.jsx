import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import format from 'date-fns/format';
import capitalize from 'lodash/capitalize';
import sortBy from 'lodash/sortBy';
import { dateFormat } from '../../../../../constants';
import { Link, Snippet, Inset } from '@asl/components';
import Subsection from '../components/subsection';

function DownloadSection({ project, version }) {
  const isApplication = project.status === 'inactive';
  const isAmendment = project.status === 'active' && version.status !== 'granted';
  const isGranted = version.status === 'granted';
  const isLegacy = project.schemaVersion === 0;
  const ntsSnippet = project.grantedRa ? 'ntsRa' : 'nts';

  const grantedVersions = sortBy(project.versions.filter(v => v.status === 'granted'), 'updatedAt');
  const superseded = isGranted && project.granted.createdAt > version.createdAt;
  const versionIndex = grantedVersions.map(v => v.id).indexOf(version.id);
  const nextVersion = grantedVersions[versionIndex + 1];
  const isFirstVersion = versionIndex === 0;

  const downloadType = isApplication
    ? 'application'
    : (isAmendment ? 'amendment' : 'application');

  return (
    <section className="download-section">
      {
        (isApplication || isAmendment) &&
          <Fragment>
            <h2>Licence {downloadType}</h2>
            <h3>{capitalize(downloadType)} started {format(version.createdAt, dateFormat.long)}</h3>

            <div>
              <h4>{capitalize(downloadType)}</h4>
              <p><Link page="projectVersion.docx" label={`Download ${downloadType} (DOCX)`} versionId={version.id} /></p>
              <p><Link page="projectVersion.pdf" query={{ application: true }} label={`Download ${downloadType} (PDF)`} versionId={version.id} /></p>
            </div>

            <div>
              <h4>Licence preview</h4>
              <p className="govuk-hint">Download a preview of how this licence will appear if granted.</p>
              <p><Link page="projectVersion.pdf" label="Download licence preview (PDF)" versionId={version.id} /></p>
            </div>
          </Fragment>
      }

      {
        isGranted &&
          <Fragment>
            {
              superseded
                ? <Fragment>
                  <h3>Licence valid from {format(isFirstVersion ? project.issueDate : version.updatedAt, dateFormat.long)} until {format(nextVersion.updatedAt, dateFormat.long)}</h3>
                </Fragment>

                : <Fragment>
                  <h2>Licence</h2>
                  <h3>Licence granted {format(version.updatedAt, dateFormat.long)}</h3>
                </Fragment>
            }

            <div>
              <h4>Licence</h4>
              <p><Link page="projectVersion.pdf" label="Download licence (PDF)" versionId={version.id} /></p>
            </div>

            <div>
              <h4>Licence {downloadType}</h4>
              <p><Link page="projectVersion.docx" label={`Download ${downloadType} (DOCX)`} versionId={version.id} /></p>
              <p><Link page="projectVersion.pdf" query={{ application: true }} label={`Download ${downloadType} (PDF)`} versionId={version.id} /></p>
            </div>
          </Fragment>
      }

      {
        !isLegacy &&
          <div>
            <h4>Protocol steps</h4>
            <p className="govuk-hint">Download a table of protocol steps, adverse effects, controls and limitations, and humane endpoints.</p>
            <p><Link page="projectVersion.protocolsPdf" label="Download protocol steps (PDF)" versionId={version.id} /></p>
          </div>
      }

      <div>
        <h4><Snippet>{`downloads.${ntsSnippet}.heading`}</Snippet></h4>
        <p><Link page="projectVersion.ntsPdf" label={<Snippet>{`downloads.${ntsSnippet}.link`}</Snippet>} versionId={version.id} /></p>
      </div>

      <div>
        <h4>Template</h4>
        <p className="govuk-hint">Download a copy of the data that can be uploaded to use as a template for similar projects.</p>
        <p><Link page="projectVersion.ppl" label="Download template (PPL)" versionId={version.id} /></p>
      </div>

    </section>
  );
}

export default function Downloads() {
  const project = useSelector(state => state.model);
  const latestVersion = project.versions[0];
  const grantedVersion = project.granted;
  const supersededVersions = project.versions.filter(v => v.status === 'granted' && v.id !== grantedVersion.id && !v.isLegacyStub);

  return (
    <div className="govuk-grid-row project-downloads">
      <div className="govuk-grid-column-two-thirds">
        <Subsection className="project-download-links">

          {
            // latest version might be application, amendment or granted
            latestVersion && <DownloadSection project={project} version={latestVersion} />
          }

          {
            // if the latest version is not the granted version, show a section for the granted version
            grantedVersion && (grantedVersion.id !== latestVersion.id) &&
              <DownloadSection project={project} version={grantedVersion} />
          }

          {
            // any previously granted versions
            supersededVersions.length > 0 &&
            <details>
              <summary>Show older licence versions</summary>
              <Inset>
                <h2>Previous licences</h2>
                { supersededVersions.map(v => <DownloadSection key={v.id} project={project} version={v} />) }
              </Inset>
            </details>
          }

        </Subsection>
      </div>
    </div>
  );
}
