import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

export default function Page() {
  const course = useSelector(state => state.static.course);
  return (
    <FormLayout cancelLink="pils.courses.read">
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={course.title}
      />
    </FormLayout>
  );
}
