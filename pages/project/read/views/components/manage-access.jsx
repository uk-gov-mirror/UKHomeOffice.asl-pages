import React from 'react';
import { useSelector } from 'react-redux';
import { Snippet, Link } from '@asl/components';
import Section from './section';
import Collaborators from '../../../components/collaborators';

export default function ManageAccess({ model }) {
  const canUpdate = useSelector(state => state.static.canUpdate);
  if (!canUpdate) {
    return null;
  }

  return (
    <Section
      title={<Snippet>manageAccess.title</Snippet>}
      content={<Snippet>manageAccess.content</Snippet>}
    >
      <p>
        <Link page="project.addUser" label={<Snippet>manageAccess.action</Snippet>} />
      </p>
      {
        !!model.collaborators.length && <Collaborators collaborators={model.collaborators} />
      }
    </Section>
  );
}
