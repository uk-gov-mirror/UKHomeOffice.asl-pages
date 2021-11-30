import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Link, StickyNavAnchor, Snippet } from '@asl/components';
import format from 'date-fns/format';
import { dateFormat } from '../../../../../constants';

export default function Project({ task }) {
  const { establishment, values } = useSelector(state => state.static, shallowEqual);
  const licenceHolder = values.project.licenceHolder;

  return [
    (
      <StickyNavAnchor id="licence-holder" key="licence-holder">
        <h2><Snippet>sticky-nav.licence-holder</Snippet></h2>
        <p className="gutter">
          <Link
            page="profile.read"
            establishmentId={establishment.id}
            profileId={licenceHolder.id}
            label={`${licenceHolder.firstName} ${licenceHolder.lastName}`}
          />
        </p>
      </StickyNavAnchor>
    ),
    (
      <StickyNavAnchor id="latest-return" key="latest-return">
        <h2><Snippet>sticky-nav.latest-return</Snippet></h2>
        <p><Snippet date={format(task.createdAt, dateFormat.long)}>view-return.content</Snippet></p>
        <p className="gutter">
          <Link
            className="govuk-button"
            page="rops.procedures"
            establishmentId={establishment.id}
            projectId={values.project.id}
            ropId={values.id}
            label={<Snippet>view-return.action</Snippet>}
          />
        </p>
      </StickyNavAnchor>
    )
  ];
}
