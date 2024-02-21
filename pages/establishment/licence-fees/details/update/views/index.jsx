import React from 'react';
import { useSelector } from 'react-redux';
import { FormLayout, Header, Snippet } from '@ukhomeoffice/asl-components';
import EstablishmentHeader from '../../../../../common/components/establishment-header';

export default function Details() {
  const establishment = useSelector(state => state.static.establishment);
  const formatters = {
    declaredCurrent: {
      renderContext: {
        currentPeriod: '6 April 2024 to 5 April 2025'
      }
    }
  };

  return (
    <FormLayout openTasks={establishment.openTasks} formatters={formatters}>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />
    </FormLayout>
  );
}
