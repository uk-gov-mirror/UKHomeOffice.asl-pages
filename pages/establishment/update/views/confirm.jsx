import React from 'react';
import { connect } from 'react-redux';
import { ControlBar, Diff, Field, Header, Snippet, FormLayout } from '@asl/components';
import { hasChanged } from '../../../../lib/utils';
import schema from '../schema';
import formatters from '../../formatters';
import Authorisations from './authorisations';

const Confirm = ({ before, after }) => {
  return (
    <FormLayout>
      <Header
        title={<Snippet>pages.establishment.confirm</Snippet>}
        subtitle={<Snippet>subtitle</Snippet>}
      />

      <Diff
        schema={{ ...schema, isTrainingEstablishment: {} }}
        before={before}
        after={after}
        comparator={hasChanged}
        formatters={formatters}
      />

      <Authorisations before={before} after={after} />

      {
        after && after.comments && (
          <Field
            title={<Snippet>fields.comments.label</Snippet>}
            content={after.comments}
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

const mapStateToProps = ({ static: { before, after } }) => ({ before, after });

export default connect(mapStateToProps)(Confirm);
