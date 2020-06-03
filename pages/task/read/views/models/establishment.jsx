import React from 'react';
import { useSelector } from 'react-redux';
import {
  StickyNavAnchor,
  Snippet,
  Diff,
  DiffText,
  Link
} from '@asl/components';
import LicenceHolder from '../../../../common/components/licence-holder';
import { hasChanged } from '../../../../../lib/utils';
import establishmentSchema from '../../../../establishment/update/schema';
import LicensedToCarryOut from '../../../../establishment/components/licensed-to-carry-out';
import NamedPeople from '../../../../establishment/components/named-people';
import formatters from '../../../../establishment/formatters';
import Authorisations from '../../../../establishment/update/views/authorisations';

export default function Establishment({ task, values }) {
  const establishment = useSelector(state => state.static.establishment);
  const showNprc = establishment.nprc && (!establishment.pelh || establishment.pelh.id !== establishment.nprc.id);

  const isComplete = !task.isOpen;

  return [
    (
      task.type === 'amendment' && (
        <StickyNavAnchor id="establishment" key="establishment">
          <h2><Snippet>sticky-nav.establishment</Snippet></h2>
          <dl className="inline">
            <dt><Snippet>establishment</Snippet></dt>
            <dd><Link page="establishment.read" establishmentId={establishment.id} label={establishment.name} /></dd>

            <dt><Snippet>licenceNumber</Snippet></dt>
            <dd>{ establishment.licenceNumber || '-' }</dd>

            {
              establishment.pelh && <LicenceHolder type="pelh" profile={establishment.pelh} />
            }
            {
              showNprc && <LicenceHolder type="nprc" profile={establishment.nprc} />
            }
          </dl>
        </StickyNavAnchor>
      )
    ),

    (
      task.type === 'application' && (
        <StickyNavAnchor id="establishment" key="establishment">
          <h2><Snippet>sticky-nav.establishment</Snippet></h2>
          <dl className="inline">
            <dt><Snippet>establishment</Snippet></dt>
            <dd><Link page="establishment.read" establishmentId={establishment.id} label={establishment.name} /></dd>

            <dt><Snippet>fields.address.label</Snippet></dt>
            <dd>{ establishment.address }</dd>

            <dt><Snippet>fields.licences.label</Snippet></dt>
            <dd><LicensedToCarryOut establishment={establishment} /></dd>
          </dl>
        </StickyNavAnchor>
      )
    ),

    (
      task.type === 'application' && (
        <StickyNavAnchor id="approved-areas" key="approved-areas">
          <h2><Snippet>sticky-nav.approved-areas</Snippet></h2>
          <dl className="inline">
            <dt><Snippet>approvedAreas.total</Snippet></dt>
            <dd>{establishment.placesCount}</dd>
          </dl>
        </StickyNavAnchor>
      )
    ),

    (
      task.type === 'application' && (
        <StickyNavAnchor id="named-people" key="named-people">
          <h2><Snippet>sticky-nav.named-people</Snippet></h2>
          <NamedPeople establishment={establishment} />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update' && (
        <StickyNavAnchor id="diff" key="diff">
          <h2><Snippet>sticky-nav.diff</Snippet></h2>
          <Diff
            before={values}
            after={task.data.data}
            schema={establishmentSchema}
            formatters={formatters}
            comparator={hasChanged}
            currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
            proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
          />

          <Authorisations
            before={values}
            after={task.data.data}
            currentTitle={isComplete && <Snippet>authorisations.previous</Snippet>}
            proposedTitle={isComplete && <Snippet>authorisations.new</Snippet>}
          />
        </StickyNavAnchor>
      )
    ),

    (
      task.data.action === 'update-conditions' && (
        <StickyNavAnchor id="conditions" key="conditions">
          <h2><Snippet>sticky-nav.conditions</Snippet></h2>
          <DiffText
            oldValue={establishment.conditions}
            newValue={task.data.data.conditions}
            currentLabel={isComplete && <Snippet>diff.previous</Snippet>}
            proposedLabel={isComplete && <Snippet>diff.changed-to</Snippet>}
          />
        </StickyNavAnchor>
      )
    )
  ];
}
