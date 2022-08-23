import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@asl/components';

const licenceType = {
  pil: 'personal',
  establishment: 'establishment',
  project: 'project'
};

export default function SuspendOrReinstateLicence({ children }) {
  const { model, modelType, profile } = useSelector(state => state.static);

  const subtitle = modelType === 'pil'
    ? `${profile.firstName} ${profile.lastName}`
    : model.name || model.title;

  return (
    <FormLayout cancelLink={`${modelType}.read`}>
      <Header
        title={<Snippet licenceType={licenceType[modelType]}>title</Snippet>}
        subtitle={subtitle}
      />
      { children }
    </FormLayout>
  );
}
