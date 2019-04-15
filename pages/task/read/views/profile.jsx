import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import { Snippet, StickyNavPage, StickyNavAnchor, Diff, Field, Form } from '@asl/components';
import schema from '../../../user/update/schema';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';
import WithdrawApplication from './withdraw-application';

const formatters = {
  dob: {
    format: date => format(date, dateFormat.short)
  }
};

const Profile = ({ task, values, children, decisionSchema }) => (
  <StickyNavPage>

    { children }

    <StickyNavAnchor id="changes">
      <h2><Snippet>sticky-nav.changes</Snippet></h2>
      <Diff values={task.data.data} model={values} schema={omit(schema, 'comments')} formatters={formatters} />
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
      decisionSchema.status.options.length > 0 &&
        <StickyNavAnchor id="status">
          <h2><Snippet>sticky-nav.status</Snippet></h2>
          <p><Snippet>make-decision.hint</Snippet></p>
          <Form />
          { task.canBeWithdrawn && <WithdrawApplication showHeading /> }
        </StickyNavAnchor>
    }

    {
      decisionSchema.status.options.length === 0 && task.canBeWithdrawn &&
        <StickyNavAnchor id="withdraw">
          <h2><Snippet>sticky-nav.withdraw</Snippet></h2>
          { task.canBeWithdrawn && <WithdrawApplication /> }
        </StickyNavAnchor>
    }
  </StickyNavPage>
);

const mapStateToProps = ({ static: { values, schema: decisionSchema } }) => ({ values, decisionSchema });

export default connect(mapStateToProps)(Profile);
