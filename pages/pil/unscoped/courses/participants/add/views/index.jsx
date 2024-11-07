import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';
import * as schema from '../content/index';

export default function Page() {
  const course = useSelector(state => state.static.course);
  return (
    <FormLayout cancelLink="pils.courses.read">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={course.title}
      />

      <p className="govuk-body">{schema.description}</p>
    </FormLayout>
  );
}
