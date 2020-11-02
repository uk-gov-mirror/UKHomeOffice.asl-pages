import React from 'react';

export default function Keywords({ version }) {
  return <p>
    {
      (version.keywords || []).length
        ? version.keywords.join(', ')
        : <em>No answer provided</em>
    }
  </p>;
}
