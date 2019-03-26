import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import dateFormatter from 'date-fns/format';
import { dateFormat } from '../../../../constants';
import {
  Link,
  Snippet,
  ModelSummary,
  Header
} from '@asl/components';

const formatters = {
  issueDate: {
    format: issueDate => dateFormatter(issueDate, dateFormat.medium)
  },
  revocationDate: {
    format: revocationDate => dateFormatter(revocationDate, dateFormat.medium)
  },
  procedures: {
    format: (procedures, pil) => (procedures || []).map(procedure => {
      return (
        <p>
          <strong>{procedure}</strong>: <Snippet>{`procedureDefinitions.${procedure}`}</Snippet>
            {
              procedure === 'F' && (
                <em>: {pil.notesCatF}</em>
              )
            }
        </p>
      )
    })
  }
};

const PIL = ({ model, profile }) => {
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={`${profile.firstName} ${profile.lastName}`}
      />
      { model.status === 'active'
        ? <ModelSummary model={model} formatters={formatters} />
        : <p><Link page="pil.update" pilId={model.id} label={<Snippet>action.applyNow</Snippet>} className="govuk-button" /></p>
      }

      <p>
        <Link page="profile.view" label={<Snippet>action.backToProfile</Snippet>} />
      </p>
    </Fragment>
  );
};

const mapStateToProps = ({ model, static: { profile } }) => ({ model, profile });

export default connect(mapStateToProps)(PIL);
