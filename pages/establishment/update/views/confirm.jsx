import React from 'react';
import { connect } from 'react-redux';
import { ControlBar, Diff, Field, Header, Snippet, FormLayout } from '@asl/components';
import { hasChanged } from '../../../../lib/utils';
import schema from '../schema';
import formatters from '../../formatters';
import Authorisations from './authorisations';

function legalPersonFrom(value) {
  return value.corporateStatus === 'corporate' ? {
    legalName: value.legalName,
    legalPhone: value.legalPhone,
    legalEmail: value.legalEmail
  } : undefined;
}

const Confirm = ({ before, after, establishmentProfiles }) => {

  const diffValues = {
    ...before,
    pelh: before.pelh && before.pelh.id,
    nprc: before.nprc && before.nprc.id,
    legalPerson: legalPersonFrom(before)
  };
  const diffAfterValues = {
    ...after,
    legalPerson: legalPersonFrom(after)
  };

  const legalPersonSchemaProperties = before.corporateStatus === 'corporate' || after.corporateStatus === 'corporate' ? {
    legalPerson: {}
  } : {};

  const nprcSchemaProperties = before.nprc || after.nprc ? {
    nprc: {}
  } : {};

  const pelhSchemaProperties = before.pelh || after.pelh ? {
    pelh: {}
  } : {};

  return (
    <FormLayout>
      <Header
        title={<Snippet>pages.establishment.confirm</Snippet>}
        subtitle={<Snippet>subtitle</Snippet>}
      />

      <Diff
        schema={{ ...schema(), isTrainingEstablishment: {}, ...legalPersonSchemaProperties, ...nprcSchemaProperties, ...pelhSchemaProperties }}
        before={diffValues}
        after={diffAfterValues}
        comparator={hasChanged}
        formatters={formatters(establishmentProfiles)}
      />

      <Authorisations before={before} after={after} />

      {
        after && after.comment && (
          <Field
            title={<Snippet>fields.comment.label</Snippet>}
            content={after.comment}
          />
        )
      }

      <ControlBar>
        <a href="?edit=true"><Snippet>buttons.edit</Snippet></a>
        <a href="?clear=true"><Snippet>buttons.cancel</Snippet></a>
      </ControlBar>

    </FormLayout>
  );
};

const mapStateToProps = ({ static: { before, after, establishmentProfiles } }) => ({ before, after, establishmentProfiles });

export default connect(mapStateToProps)(Confirm);
