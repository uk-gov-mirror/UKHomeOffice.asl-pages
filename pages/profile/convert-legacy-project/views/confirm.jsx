import React from 'react';
import { useSelector } from 'react-redux';
import { ControlBar, Header, Snippet, FormLayout, ModelSummary } from '@asl/components';
import { Warning } from '@ukhomeoffice/react-components';
import { dateFormat } from '../../../../constants';
import { formatDate } from '../../../../lib/utils';
import EstablishmentHeader from '../../../common/components/establishment-header';

const formatters = {
  issueDate: {
    format: issueDate => formatDate(issueDate, dateFormat.long)
  },
  duration: {
    format: duration => {
      const { years, months } = duration;
      return `${years} years ${months} months`;
    }
  }
};

export default function ConvertProjectConfirm() {
  const model = useSelector(state => state.model);
  const establishment = useSelector(state => state.static.establishment);

  return (
    <FormLayout>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={<EstablishmentHeader establishment={establishment}/>}
      />

      <p><Snippet>description</Snippet></p>

      <ModelSummary model={model} formatters={formatters} />

      <Warning><Snippet>warning</Snippet></Warning>

      <ControlBar>
        <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
        <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
      </ControlBar>

    </FormLayout>
  );
}
