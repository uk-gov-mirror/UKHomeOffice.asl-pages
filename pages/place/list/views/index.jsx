import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import dict from '@asl/dictionary';
import FilterTable from '../../../common/views/components/filter-table';
import Acronym from '../../../common/views/components/acronym';
import Join from '../../../common/views/components/join';
import Snippet from '../../../common/views/containers/snippet';
import Controls from '../../../common/views/containers/controls';

const joinAcronyms = data => {
  if (Array.isArray(data)) {
    return <Join>{ data.map(a => <Acronym key={a}>{a}</Acronym>) }</Join>;
  }
  return <Acronym key={data}>{data}</Acronym>;
};

const defineValue = val => `${dict[val] || dict[val.toUpperCase()]} (${val})`;

export const formatters = {
  name: {
    format: (val, row) => {
      return (
        <Fragment>
          {
            val
          }
          {
            row.notes && <i className="icon icon-information" />
          }
        </Fragment>
      );
    }
  },
  suitability: {
    format: joinAcronyms,
    formatFilterItems: defineValue
  },
  holding: {
    format: joinAcronyms,
    formatFilterItems: defineValue
  }
};

const ExpandableRow = ({ row, schema }) => (
  <div className="grid-row">
    <div className={classnames({
      'column-one-third': row.notes,
      'column-full': !row.notes
    })}>
      <Controls item={row.id} />
    </div>
    {
      row.notes && (
        <div className="column-two-thirds">
          <dl>
            <dt>{<Snippet>fields.restrictions.label</Snippet>}</dt>
            <dd>{row.notes}</dd>
          </dl>
        </div>
      )
    }
  </div>
);

const Places = ({
  establishment: { name },
  ...props
}) => (
  <Fragment>
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.places</Snippet></h1>
    </header>
    <FilterTable formatters={formatters} ExpandableRow={ExpandableRow} editable={true} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Places);
