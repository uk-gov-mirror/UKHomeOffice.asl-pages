import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { map, size } from 'lodash';
import { getValue } from '../../../../lib/utils';
import DatatableHeader from '../containers/datatable-header';
import Pagination from '../containers/pagination';

class Table extends Component {
  constructor(options) {
    super(options);
    this.toggleContent = this.toggleContent.bind(this);
    this.isExpandable = this.isExpandable.bind(this);
  }

  componentDidMount() {
    if (!this.props.ExpandableRow) {
      return;
    }
    const expanded = this.props.data.reduce((obj, { id }) => {
      return { ...obj, [id]: false };
    }, {});
    this.setState({ expanded });
  }

  toggleContent(id) {
    const { expanded } = this.state;
    expanded[id] = !expanded[id];
    this.setState({ expanded });
  }

  isExpandable(id) {
    if (this.props.ExpandableRow) {
      if (!this.state) {
        return true;
      }
      return this.state && this.state.expanded[id];
    }
  }

  render() {
    const {
      data,
      schema,
      sortable,
      ExpandableRow
    } = this.props;
    return (
      <table className="govuk-react-datatable">
        <thead>
          <tr>
            {
              map(schema, (column, key) =>
                <DatatableHeader key={key} id={key} sortable={sortable} { ...column } />
              )
            }
          </tr>
          <tr id="filter-header"></tr>
        </thead>
        <tbody>
          {
            data.map(row => (
              <Fragment key={row.id}>
                <tr
                  onClick={ExpandableRow && (() => this.toggleContent(row.id))}
                  className={classnames({
                    expandable: ExpandableRow,
                    expanded: ExpandableRow && this.state && this.state.expanded[row.id]
                  })}
                >
                  {
                    map(schema, (column, key) => {
                      const datum = getValue({ row, schema: column, key });
                      return <td key={key} className={key}>
                        { column.format ? column.format(datum, row) : datum }
                      </td>;
                    })
                  }
                </tr>
                {
                  this.isExpandable(row.id) && (
                    <tr className='expanded-content' onClick={() => this.toggleContent(row.id)}>
                      <td colSpan={size(schema)}>
                        {
                          <ExpandableRow
                            row={row}
                            schema={schema}
                          />
                        }
                      </td>
                    </tr>
                  )
                }
              </Fragment>

            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={size(schema)}>
              <Pagination />
            </td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

module.exports = Table;
