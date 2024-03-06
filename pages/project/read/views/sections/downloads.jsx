import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import capitalize from 'lodash/capitalize';
import sortBy from 'lodash/sortBy';
import { dateFormat } from '../../../../../constants';
import { Link, Snippet, Inset } from '@ukhomeoffice/asl-components';
import Subsection from '../components/subsection';

function DownloadSection({ project, version }) {
  const isApplication = project.status === 'inactive';
  const isAmendment =
    project.status === 'active' && version.status !== 'granted';
  const isGranted = version.status === 'granted';
  const isLegacy = project.schemaVersion === 0;
  const isExpired =
    project.expiryDate && project.expiryDate < new Date().toISOString();
  const isRevoked =
    project.revocationDate && project.revocationDate < new Date().toISOString();

  const ntsSnippet = project.grantedRa ? 'ntsRa' : 'nts';
  const downloadType = isAmendment ? 'amendment' : 'application';

  const grantedVersions = sortBy(
    project.versions.filter((v) => v.status === 'granted'),
    'updatedAt'
  );
  const isSuperseded =
    isGranted && project.granted.createdAt > version.createdAt;
  const versionIndex = grantedVersions.map((v) => v.id).indexOf(version.id);
  const isFirstVersion = versionIndex === 0;
  const nextVersion = grantedVersions[versionIndex + 1];

  let startDate = project.amendedDate || project.issueDate;
  let endDate;

  if (isApplication || isAmendment) {
    startDate = version.createdAt;
  }

  if (isSuperseded) {
    startDate = isFirstVersion ? project.issueDate : version.updatedAt;
  }

  if (nextVersion) {
    endDate = nextVersion.updatedAt;
  }

  if (isRevoked || isExpired) {
    endDate = project.revocationDate || project.expiryDate;
  }

  return (
    <section className="download-section" id={version.id}>
      {(isApplication || isAmendment) && (
        <Fragment>
          <h2>
            <Snippet>{`downloads.${downloadType}.heading`}</Snippet>
          </h2>
          <h3>
            <Snippet
              started={format(startDate, dateFormat.long)}
            >{`downloads.${downloadType}.subHeading`}</Snippet>
          </h3>

          <div>
            <h4>{capitalize(downloadType)}</h4>
            <p>
              <Link
                page="projectVersion.docx"
                label={`Download ${downloadType} (DOCX)`}
                versionId={version.id}
              />
            </p>
            <p>
              <Link
                page="projectVersion.pdf"
                query={{ application: true }}
                label={`Download ${downloadType} (PDF)`}
                versionId={version.id}
              />
            </p>
          </div>

          <div>
            <h4>
              <Snippet>downloads.application.licence.heading</Snippet>
            </h4>
            <p className="govuk-hint">
              <Snippet>downloads.application.licence.hint</Snippet>
            </p>
            <p>
              <Link
                page="projectVersion.pdf"
                label={<Snippet>downloads.application.licence.link</Snippet>}
                versionId={version.id}
              />
            </p>
          </div>
        </Fragment>
      )}

      {isGranted && (
        <Fragment>
          {isSuperseded ? (
            <h3>
              <Snippet
                start={format(startDate, dateFormat.long)}
                end={format(endDate, dateFormat.long)}
              >
                downloads.superseded.subHeading
              </Snippet>
            </h3>
          ) : (
            <Fragment>
              {isRevoked || isExpired ? (
                <Fragment>
                  <h2>
                    <Snippet>{`downloads.${
                      isRevoked ? 'revoked' : 'expired'
                    }.heading`}</Snippet>
                  </h2>
                  <h3>
                    <Snippet
                      start={format(startDate, dateFormat.long)}
                      end={format(endDate, dateFormat.long)}
                    >
                      downloads.expired.subHeading
                    </Snippet>
                  </h3>
                </Fragment>
              ) : (
                <Fragment>
                  <h2>
                    <Snippet>downloads.granted.heading</Snippet>
                  </h2>
                  <h3>
                    <Snippet granted={format(startDate, dateFormat.long)}>
                      downloads.granted.subHeading
                    </Snippet>
                  </h3>
                </Fragment>
              )}
            </Fragment>
          )}

          <div>
            <h4>
              <Snippet>downloads.granted.licence.heading</Snippet>
            </h4>
            <p>
              <Link
                page="projectVersion.pdf"
                label={<Snippet>downloads.granted.licence.link</Snippet>}
                versionId={version.id}
              />
            </p>
          </div>

          <div>
            <h4>
              <Snippet>downloads.granted.application.heading</Snippet>
            </h4>
            <p>
              <Link
                page="projectVersion.docx"
                label={
                  <Snippet>downloads.granted.application.linkDocx</Snippet>
                }
                versionId={version.id}
              />
            </p>
            <p>
              <Link
                page="projectVersion.pdf"
                query={{ application: true }}
                label={<Snippet>downloads.granted.application.linkPdf</Snippet>}
                versionId={version.id}
              />
            </p>
          </div>
        </Fragment>
      )}

      {!isLegacy && (
        <div>
          <h4>
            <Snippet>downloads.protocols.heading</Snippet>
          </h4>
          <p className="govuk-hint">
            <Snippet>downloads.protocols.hint</Snippet>
          </p>
          <p>
            <Link
              page="projectVersion.protocolsPdf"
              label={<Snippet>downloads.protocols.link</Snippet>}
              versionId={version.id}
            />
          </p>
        </div>
      )}

      <div>
        <h4>
          <Snippet>{`downloads.${ntsSnippet}.heading`}</Snippet>
        </h4>
        <p>
          <Link
            page="projectVersion.ntsPdf"
            label={<Snippet>{`downloads.${ntsSnippet}.link`}</Snippet>}
            versionId={version.id}
          />
        </p>
      </div>

      {!isLegacy && (
        <div>
          <h4>
            <Snippet>downloads.template.heading</Snippet>
          </h4>
          <p className="govuk-hint">
            <Snippet>downloads.template.hint</Snippet>
          </p>
          <p>
            <Link
              page="projectVersion.ppl"
              label={<Snippet>downloads.template.link</Snippet>}
              versionId={version.id}
            />
          </p>
        </div>
      )}

      {version.hbaToken && (
        <div>
          <h4>
            <Snippet>downloads.hba.heading</Snippet>
          </h4>
          <p className="govuk-hint">
            <Snippet>downloads.hba.hint</Snippet>
          </p>
          <p>
            <a href={`/attachment/${version.hbaToken}`} download={`${version.hbaFilename}`}>
              <Snippet>downloads.hba.link</Snippet>
            </a>
          </p>
        </div>
      )}
    </section>
  );
}

export default function Downloads() {
  const project = useSelector((state) => state.model);
  const viewingAtAAEstablishment = useSelector(
    (state) => state.static.additionalAvailability
  );

  const latestVersion = project.versions[0];
  const grantedVersion = project.granted;
  const latestIsGranted =
    grantedVersion && grantedVersion.id === latestVersion.id;

  const supersededVersions = project.versions.filter(
    (v) =>
      v.status === 'granted' && v.id !== grantedVersion.id && !v.isLegacyStub
  );

  return (
    <div className="govuk-grid-row project-downloads">
      <div className="govuk-grid-column-two-thirds">
        <Subsection className="project-download-links">
          {
            // latest version might be application, amendment or granted
            latestVersion && (latestIsGranted || !viewingAtAAEstablishment) && (
              <DownloadSection project={project} version={latestVersion} />
            )
          }

          {
            // if the latest version is not the granted version, show a section for the granted version
            grantedVersion && !latestIsGranted && (
              <DownloadSection project={project} version={grantedVersion} />
            )
          }

          {
            // any previously granted versions
            supersededVersions.length > 0 && !viewingAtAAEstablishment && (
              <details className="previous-licences">
                <summary>Show older licence versions</summary>
                <Inset>
                  <h2>Previous licences</h2>
                  {supersededVersions.map((v) => (
                    <DownloadSection key={v.id} project={project} version={v} />
                  ))}
                </Inset>
              </details>
            )
          }
        </Subsection>
      </div>
    </div>
  );
}
