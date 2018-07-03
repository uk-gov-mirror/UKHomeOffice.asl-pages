import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import FilterTable from '../../../common/views/components/filter-table';
import Snippet from '../../../common/views/containers/snippet';
import Controls from '../../../common/views/containers/controls';
import formatters from '../../formatters';

const pageFormatters = {
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
  }
};

const ExpandableRow = ({ row, schema }) => (
  <div className="grid-row">
    <div className={classnames({
      'column-one-quarter': row.notes,
      'column-full': !row.notes
    })}>
      <Controls item={row.id} />
    </div>
    {
      row.notes && (
        <div className="column-two-thirds">
          <h3>{<Snippet>fields.restrictions.label</Snippet>}</h3>
          <ReactMarkdown>{row.notes}</ReactMarkdown>
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
      <h1><Snippet>pages.place.list</Snippet></h1>
    </header>
    <FilterTable formatters={Object.assign({}, formatters, pageFormatters)} ExpandableRow={ExpandableRow} editable={true} />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment } }) => ({ establishment });

export default connect(mapStateToProps)(Places);
