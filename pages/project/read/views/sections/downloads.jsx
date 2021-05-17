import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet } from '@asl/components';
import Subsection from '../components/subsection';

export default function Downloads() {
  const project = useSelector(state => state.model);
  const grantedVersion = project.granted;
  const latestVersion = project.versions[0];
  const linkVersion = grantedVersion || latestVersion;
  const licenceStatus = grantedVersion ? project.status : 'inactive';
  const title = grantedVersion ? 'Project downloads' : 'Application downloads';
  const isLegacy = project.schemaVersion === 0;

  const amendmentInProgress = !!(project.openTasks || []).find(t => t.type === 'amendment');
  const ntsSnippet = project.grantedRa ? 'ntsRa' : 'nts';

  return (
    <div className="govuk-grid-row project-downloads">
      <div className="govuk-grid-column-two-thirds">
        <Subsection title={title} className="project-download-links">

          <Fragment>
            <h3><Snippet>{`downloads.licence.${licenceStatus}.heading`}</Snippet></h3>
            <p>
              <Link
                page="projectVersion.pdf"
                versionId={linkVersion.id}
                label={<Snippet title={project.title}>{`downloads.licence.${licenceStatus}.link`}</Snippet>}
              />
            </p>
            <p className="govuk-hint"><Snippet>{`downloads.licence.${licenceStatus}.hint`}</Snippet></p>
          </Fragment>

          <Fragment>
            <h3><Snippet>{`downloads.${ntsSnippet}.heading`}</Snippet></h3>
            <p>
              <Link
                page="projectVersion.ntsPdf"
                label={<Snippet>{`downloads.${ntsSnippet}.link`}</Snippet>}
                versionId={linkVersion.id}
              />
            </p>
            <p className="govuk-hint"><Snippet>{`downloads.${ntsSnippet}.hint`}</Snippet></p>
          </Fragment>

          {
            !isLegacy && (
              <Fragment>
                <h3><Snippet>downloads.protocols.heading</Snippet></h3>
                <p>
                  <Link
                    page="projectVersion.protocolsPdf"
                    label={<Snippet>downloads.protocols.link</Snippet>}
                    versionId={linkVersion.id}
                  />
                </p>
                <p className="govuk-hint"><Snippet>downloads.protocols.hint</Snippet></p>
              </Fragment>
            )
          }

          <Fragment>
            <h3><Snippet>{`downloads.${amendmentInProgress ? 'amendment' : 'application'}.heading`}</Snippet></h3>
            <p>
              <Link
                page="projectVersion.docx"
                label={<Snippet>{`downloads.${amendmentInProgress ? 'amendment' : 'application'}.link`}</Snippet>}
                versionId={latestVersion.id}
              />
            </p>
            <p>
              <Link
                page="projectVersion.pdf"
                query={{ application: true }}
                label={<Snippet>{`downloads.${amendmentInProgress ? 'amendment' : 'application'}.pdf-link`}</Snippet>}
                versionId={latestVersion.id}
              />
            </p>
            <p className="govuk-hint"><Snippet>{`downloads.${amendmentInProgress ? 'amendment' : 'application'}.hint`}</Snippet></p>
          </Fragment>

          {
            !isLegacy && (
              <Fragment>
                <h3><Snippet>downloads.template.heading</Snippet></h3>
                <p>
                  <Link
                    page="projectVersion.ppl"
                    label={<Snippet>downloads.template.link</Snippet>}
                    versionId={linkVersion.id}
                  />
                </p>
                <p className="govuk-hint"><Snippet>downloads.template.hint</Snippet></p>
              </Fragment>
            )
          }

        </Subsection>
      </div>
    </div>
  );
}
