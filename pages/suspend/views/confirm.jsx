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
  const { model, static: { modelType, profile } } = useSelector(state => state);

  const subtitle = modelType === 'pil'
    ? `${profile.firstName} ${profile.lastName}`
    : model.name || model.title;

  return (
    <FormLayout cancelLink={`${modelType}.read`}>
      <Header
        title={<Snippet licenceType={licenceType[modelType]}>title</Snippet>}
        subtitle={subtitle}
      />

      <dl>
        {
          modelType === 'pil' &&
            <Fragment>
              <dt>Licence holder</dt>
              <dd>{`${profile.firstName} ${profile.lastName}`}</dd>
              <dt>Licence number</dt>
              <dd>{profile.pilLicenceNumber}</dd>
            </Fragment>
        }
        <dt><Snippet>reason</Snippet></dt>
        <dd>{model.comment}</dd>

        <Warning><Snippet>{`warning.${modelType}`}</Snippet></Warning>
      </dl>
    </FormLayout>
  );
}
