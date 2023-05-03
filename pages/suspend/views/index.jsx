import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';

const licenceType = {
  pil: 'personal',
  establishment: 'establishment',
  project: 'project'
};

const getLicenceName = ({ modelType, model, licenceHolder }) => {
  const licenceName = {
    pil: `${licenceHolder.firstName} ${licenceHolder.lastName}`,
    establishment: model.name,
    project: model.title
  };
  return licenceName[modelType];
};

export default function SuspendOrReinstateLicence({ children }) {
  const { modelType, model, licenceHolder } = useSelector(state => state.static);

  return (
    <FormLayout cancelLink={`${modelType}.read`}>
      <Header
        title={<Snippet licenceType={licenceType[modelType]}>title</Snippet>}
        subtitle={getLicenceName({ modelType, model, licenceHolder })}
      />
      { children }
    </FormLayout>
  );
}
