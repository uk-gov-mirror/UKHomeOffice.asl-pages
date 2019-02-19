import React from 'react';
import { connect } from 'react-redux';
import omit from 'lodash/omit';
import { Snippet, StickyNavPage, StickyNavAnchor, Diff, Field } from '@asl/components';
import schema from '../../../user/update/schema';
import { dateFormat } from '../../../../constants';
import format from 'date-fns/format';

const formatters = {
  dob: {
    format: date => format(date, dateFormat.short)
  }
};

const Profile = ({ task, model, values, formFields, children }) => (
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
      !!task.nextSteps.length && (
        <StickyNavAnchor id="status">
          <h2><Snippet>sticky-nav.status</Snippet></h2>
          {
            formFields
          }
        </StickyNavAnchor>
      )
    }
  </StickyNavPage>
);

const mapStateToProps = ({ model, static: { values } }) => ({ model, values });

export default connect(mapStateToProps)(Profile);
