import React, { Fragment } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Header, Snippet, Link } from '@ukhomeoffice/asl-components';
import CancelLink from '../../../components/cancel-link';
import RopHeader from '../../../components/header';

export default function Confirm() {
  const { step } = useSelector(state => state.static, shallowEqual);
  const titleStep = step === 'species' ? 'animals' : step;
  return (
    <Fragment>
      <RopHeader />
      <Header
        title={<Snippet titleStep={titleStep}>title</Snippet>}
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
