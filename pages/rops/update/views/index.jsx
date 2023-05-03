import React from 'react';
import { useSelector } from 'react-redux';
import pick from 'lodash/pick';
import { Header, Snippet, FormLayout } from '@ukhomeoffice/asl-components';
import formatters from '../formatters';
import components from './components';
import CancelLink from '../../components/cancel-link';
import Guidance from '../../components/guidance';
import RopHeader from '../../components/header';

export default function Step() {
  const { step, schema, section } = useSelector(state => state.static);
  const Component = components[step];
  const showGuidance = step !== 'confirm';
  return (
    <section id="rops">
      <RopHeader />
      <FormLayout formatters={pick(formatters, Object.keys(schema || {}))} cancelLink={<CancelLink />} sidebar={showGuidance && <Guidance />}>
        <Header
          title={<Snippet>title</Snippet>}
          subtitle={!!section && <Snippet section={section}>subtitle</Snippet>}
        />
        <p className="optional-content"><Snippet optional>content</Snippet></p>
        {
          Component && <Component />
        }
      </FormLayout>
    </section>
  );
}
