import React from 'react';
import { useSelector } from 'react-redux';
import {
  FormLayout,
  Header,
  Snippet
} from '@asl/components';
import EstablishmentHeader from '../../../common/components/establishment-header';

export default function ConvertProject() {
  const establishment = useSelector(state => state.static.establishment);

  return (
    <FormLayout>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />
      <p><Snippet>description</Snippet></p>
    </FormLayout>
  );
}
