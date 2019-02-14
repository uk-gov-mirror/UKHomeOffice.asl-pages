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
  }
};

const PIL = ({ model, profile }) => {
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={profile.name}
      />
      { model.status === 'active'
        ? <ModelSummary model={model} formatters={formatters} />
        : <div><Link page="pil.update" pilId={model.id} label={<Snippet>action.applyNow</Snippet>} className="govuk-button" /></div>
      }

      <div>
        <Link page="profile.view" label={<Snippet>action.backToProfile</Snippet>} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = ({ model, static: { profile } }) => ({ model, profile });

export default connect(mapStateToProps)(PIL);
