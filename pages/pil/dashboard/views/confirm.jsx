import React from 'react';
import { useSelector } from 'react-redux';
import { Header, Snippet, FormLayout } from '@asl/components';

export default function Confirm() {
  // const model = useSelector(state => state.model);

  // const isPilTransfer = !!model.establishment.to;
  // let submitSnippet = 'buttons.submit';

  // if (isAsru && !isPilTransfer) {
  //   submitSnippet = 'buttons.submitAsAsru';

  //   if (isLicensing) {
  //     submitSnippet = 'buttons.submitAsLicensing';
  //   }
  // }

  return (
    <FormLayout>
      <Header title={<Snippet>title</Snippet>} />
    </FormLayout>
  );
}
