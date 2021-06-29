import React from 'react';
import { useSelector } from 'react-redux';
import pick from 'lodash/pick';
import { Header, Snippet, FormLayout } from '@asl/components';
import formatters from '../formatters';
import components from './components';
import CancelLink from '../../components/cancel-link';

export default function Step() {
  const { step, schema, project } = useSelector(state => state.static);
  const Component = components[step];
  return (
    <FormLayout formatters={pick(formatters, Object.keys(schema || {}))} cancelLink={<CancelLink />}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      <Snippet optional>content</Snippet>
      {
        Component && <Component />
      }
    </FormLayout>
  );
}
