import React from 'react';
import { useSelector } from 'react-redux';
import {
  FormLayout,
  Header,
  Snippet,
  Details,
  Inset
} from '@ukhomeoffice/asl-components';

const Page = () => {
  const { project, schema } = useSelector(state => state.static);

  schema.primaryEstablishment.hint = (
    <Details summary={<Snippet>fields.primaryEstablishment.hint.summary</Snippet>} className="margin-top">
      <Inset><Snippet>fields.primaryEstablishment.hint.details</Snippet></Inset>
    </Details>
  );

  return (
    <FormLayout schema={schema} cancelLink="projectVersion.update" versionId={project.draft.id}>
      <Header title={<Snippet>title</Snippet>} />
    </FormLayout>
  );
};

export default Page;
