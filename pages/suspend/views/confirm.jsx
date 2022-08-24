import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Header, FormLayout, Snippet } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';

const licenceType = {
  pil: 'personal',
  establishment: 'establishment',
  project: 'project'
};

export default function ConfirmSuspension() {
  const { model, static: { modelType, licence, licenceHolder } } = useSelector(state => state);

  const subtitle = modelType === 'pil'
    ? `${licenceHolder.firstName} ${licenceHolder.lastName}`
    : licence.name || licence.title;

  return (
    <FormLayout cancelLink={`${modelType}.read`}>
      <Header
        title={<Snippet licenceType={licenceType[modelType]}>title</Snippet>}
        subtitle={subtitle}
      />

      <dl>
        {
          ['pil', 'project'].includes(modelType) &&
            <Fragment>
              <dt>Licence holder</dt>
              <dd>{`${licenceHolder.firstName} ${licenceHolder.lastName}`}</dd>
              <dt>Licence number</dt>
              <dd>{modelType === 'pil' ? licenceHolder.pilLicenceNumber : licence.licenceNumber}</dd>
            </Fragment>
        }
        <dt><Snippet>reason</Snippet></dt>
        <dd>{model.comment}</dd>

        <Warning><Snippet>{`warning.${modelType}`}</Snippet></Warning>
      </dl>
    </FormLayout>
  );
}
