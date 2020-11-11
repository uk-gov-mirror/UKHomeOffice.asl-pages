import React from 'react';
import { Link, Snippet } from '@asl/components';

export default function RelatedContent({ project, version }) {
  return (
    <div className="related-content">
      <h3>Related content</h3>
      <ul>
        <li>
          <Link page="projectVersion.nts" projectId={project.id} versionId={version.id} label={<Snippet>related.nts</Snippet>} />
        </li>
      </ul>
    </div>
  );
}
