import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Header, Snippet, Link } from '@asl/components';
import CancelLink from '../../../components/cancel-link';

export default function Confirm() {
  const { project, step } = useSelector(state => state.static, shallowEqual);
  return (
    <Fragment>
      <Header
        title={<Snippet>title</Snippet>}
        subtitle={project.title}
      />
      <Snippet>content</Snippet>
      <div className="control-panel">
        <Link
          page="rops.update"
          label="Continue"
          className="govuk-button"
          step={step}
        />
        <CancelLink />
      </div>
    </Fragment>
  );
}
