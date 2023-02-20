import React from 'react';
import { useSelector } from 'react-redux';
import { FormLayout, Header, Snippet, Inset } from '@asl/components';
import EstablishmentHeader from '../../../../../common/components/establishment-header';

export default function Details() {
  const establishment = useSelector(state => state.static.establishment);
  return (
    <FormLayout openTasks={establishment.openTasks}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />
      <Snippet>intro</Snippet>
      <Inset>
        <Snippet>inset</Snippet>
      </Inset>
    </FormLayout>
  );
}
