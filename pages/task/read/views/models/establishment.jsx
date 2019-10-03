import React from 'react';
import { useSelector } from 'react-redux';
import {
  StickyNavAnchor,
  Snippet,
  Diff,
  DiffText
} from '@asl/components';
import LicenceHolder from '../../../../common/components/licence-holder';
import { hasChanged } from '../../../../../lib/utils';
import establishmentSchema from '../../../../establishment/update/schema';
import formatters from '../../../../establishment/formatters';
import { groupFlags } from '../../../../establishment/update/helpers';
import Authorisations from '../../../../establishment/update/views/authorisations';

export default function Establishment({ task, schema, values }) {
  const establishment = useSelector(state => state.static.establishment);
  const showNprc = establishment.nprc && (!establishment.pelh || establishment.pelh.id !== establishment.nprc.id);

  return [
    <StickyNavAnchor id="establishment" key="establishment">
      <h2><Snippet>sticky-nav.establishment</Snippet></h2>
      <dl className="inline">
        <dt><Snippet>establishment</Snippet></dt>
        <dd>{ establishment.name }</dd>

        <dt><Snippet>licenceNumber</Snippet></dt>
        <dd>{ establishment.licenceNumber }</dd>
        {
          establishment.pelh && <LicenceHolder type="pelh" profile={establishment.pelh} />
        }
        {
          showNprc && <LicenceHolder type="nprc" profile={establishment.nprc} />
        }
      </dl>
    </StickyNavAnchor>,

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="diff" key="diff">
          <h2><Snippet>sticky-nav.diff</Snippet></h2>
          <Diff
            values={groupFlags(task.data.data)}
            model={groupFlags(values)}
            schema={establishmentSchema}
            formatters={formatters}
            comparator={hasChanged}
          />

          <Authorisations model={values} values={task.data.data} />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update-conditions' && (
        <StickyNavAnchor id="conditions" key="conditions">
          <h2><Snippet>sticky-nav.conditions</Snippet></h2>
          <DiffText oldValue={establishment.conditions} newValue={task.data.data.conditions} />
        </StickyNavAnchor>
      )
    )
  ];
}
