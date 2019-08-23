import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import {
  StickyNavPage,
  StickyNavAnchor,
  Snippet,
  Field
} from '@asl/components';
import Establishment from './establishment';
import PIL from './pil';
import Place from './place';
import Profile from './profile';
import Project from './project';
import Role from './role';

import ActivityLog from '../components/activity-log';

const models = {
  establishment: Establishment,
  pil: PIL,
  place: Place,
  profile: Profile,
  project: Project,
  role: Role
};

const selector = ({ static: { schema, values } }) => ({ schema, values });

export default function Model({ task, formFields }) {
  const { schema, values } = useSelector(selector, shallowEqual);
  const Model = models[task.data.model];
  // early PPL amendments had a typo in the field name: comment (typo) vs comments (correct)
  const hasComments = task.data.meta &&
    (task.data.meta.comments || task.data.meta.comment);

  return (
    <StickyNavPage>
      <StickyNavAnchor id="activity">
        <ActivityLog task={task} />
      </StickyNavAnchor>
      {
        Model({ task, schema, values })
      }
      {
        hasComments && (
          <StickyNavAnchor id={task.data.action === 'revoke' ? 'revocation' : 'comments'}>
            <Field
              title={<Snippet>{`sticky-nav.${task.data.action === 'revoke' ? 'revocation' : 'comments'}`}</Snippet>}
              content={task.data.meta.comments || task.data.meta.comment}
            />
          </StickyNavAnchor>
        )
      }
      {
        schema.status.options.length > 0 &&
          <StickyNavAnchor id="status">
            <h2><Snippet>sticky-nav.status</Snippet></h2>
            <p><Snippet>make-decision.hint</Snippet></p>
            { formFields }
          </StickyNavAnchor>
      }
    </StickyNavPage>
  );
}
