import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import { Snippet, StickyNavPage, StickyNavAnchor, Diff, Field } from '@asl/components';
import userSchema from '../../../user/update/schema';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';
import WithdrawApplication from './withdraw-application';
import MakeDecision from './make-decision';

const formatters = {
  dob: {
    format: date => format(date, dateFormat.short)
  }
};

const Profile = ({ task, values, children, schema, formFields }) => (
  <StickyNavPage>

    { children }

    <StickyNavAnchor id="changes">
      <h2><Snippet>sticky-nav.changes</Snippet></h2>
      <Diff values={task.data.data} model={values} schema={omit(userSchema, 'comments')} formatters={formatters} />
    </StickyNavAnchor>
    <StickyNavAnchor id="comments">
      <Field
        title={<Snippet>sticky-nav.comments</Snippet>}
        content={task.data.meta.comments}
      />
      {
        !task.data.meta.comments && <em><Snippet>no-comments</Snippet></em>
      }
    </StickyNavAnchor>

    {
      schema.status.options.length > 0 &&
        <StickyNavAnchor id="status">
          <h2><Snippet>sticky-nav.status</Snippet></h2>
          <p><Snippet>make-decision.hint</Snippet></p>
          <MakeDecision schema={schema} formFields={formFields} />
          {
            task.canBeWithdrawn && <WithdrawApplication showHeading />
          }
        </StickyNavAnchor>
    }

    {
      // if the only option is to withdraw, display the withdraw button
      schema.status.options.length === 0 && task.canBeWithdrawn &&
        <StickyNavAnchor id="withdraw">
          <h2><Snippet>sticky-nav.withdraw</Snippet></h2>
          <WithdrawApplication />
        </StickyNavAnchor>
    }
  </StickyNavPage>
);

const mapStateToProps = ({ static: { values, schema } }) => ({ values, schema });

export default connect(mapStateToProps)(Profile);
