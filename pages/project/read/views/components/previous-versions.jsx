import React from 'react';
import { useSelector } from 'react-redux';
import { Link, Snippet } from '@ukhomeoffice/asl-components';
import Subsection from './subsection';
import { formatDate } from '../../../../../lib/utils';
import { dateFormat } from '../../../../../constants';

export default function PreviousVersions() {
  const project = useSelector(state => state.model);
  const versions = project.versions.filter(v => v.status === 'granted' && v.id !== project.granted.id && !v.isLegacyStub);

  if (project.status === 'transferred') {
    versions.unshift(project.granted);
  }

  if (!versions.length) {
    return null;
  }

  return (
    <Subsection
      title={<Snippet>previousVersions.title</Snippet>}
      content={<Snippet>previousVersions.description</Snippet>}
    >
      <ul>
        {
          versions.map((v, i) => {
            const isFirstVersion = i === versions.length - 1;
            const updatedAt = isFirstVersion
              ? project.issueDate
              : v.updatedAt;
            const type = isFirstVersion
              ? 'licence'
              : 'amendment';
            return (
              <li key={i}>
                <Link
                  page="projectVersion"
                  versionId={v.id}
                  label={<Snippet type={type} updatedAt={formatDate(updatedAt, dateFormat.long)}>previousVersions.version</Snippet>}
                />
              </li>
            );
          })
        }
      </ul>
    </Subsection>
  );
}
