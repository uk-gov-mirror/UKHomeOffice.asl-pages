import React from 'react';
import { useSelector } from 'react-redux';
import {
  FormLayout,
  Header,
  Snippet
} from '@asl/components';

const Page = () => {
  const project = useSelector(state => state.static.project);
  return (
    <FormLayout cancelLink="projectVersion.update" versionId={project.draft.id}>
      <Header title={<Snippet>title</Snippet>} />
    </FormLayout>
  );
};

export default Page;
