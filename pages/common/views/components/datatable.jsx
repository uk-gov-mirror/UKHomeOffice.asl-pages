import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import { map, isEmpty, isUndefined, size, pickBy } from 'lodash';
import { getValue } from '../../../../lib/utils';
import DatatableHeader from '../containers/datatable-header';

class Table extends Component {
  constructor(options) {
    super(options);
    this.toggleContent = this.toggleContent.bind(this);
    this.isExpandable = this.isExpandable.bind(this);
  }

  componentDidMount() {
    if (!this.props.expandable) {
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
    if (this.props.expandable) {
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
      expandable,
      url,
      editLink = 'Change',
      deleteLink = 'Remove'
    } = this.props;
    if (isUndefined(data)) {
      throw new Error('data must be provided');
    }
    const columns = !isEmpty(schema)
      ? pickBy(schema, s => !s.expandable)
      : Object.keys(data[0]).reduce((obj, key) => ({ ...obj, [key]: {} }), {});
    const expandableData = pickBy(schema, s => s.expandable);
    return (
      <table className="govuk-react-datatable">
        <thead>
          <tr>
            {
              map(columns, (column, key) =>
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
                  onClick={ expandable && (() => this.toggleContent(row.id)) }
                  className={classnames({
                    expandable,
                    restrictions: row.notes,
                    expanded: expandable && this.state && this.state.expanded[row.id]
                  })}
                >
                  {
                    map(columns, (schema, key) => {
                      const datum = getValue({ row, schema, key });
                      return <td key={key} className={key}>
                        { schema.format ? schema.format(datum, row) : datum }
                      </td>;
                    })
                  }
                </tr>
                {
                  this.isExpandable(row.id) && (
                    <tr className='expanded-content' onClick={ expandable && (() => this.toggleContent(row.id)) }>
                      <td className="controls" colSpan={row.notes ? 1 : size(columns)}>
                        <a href={`${url}/${row.id}/edit`}>{ editLink }</a>
                        <a href={`${url}/${row.id}/delete`}>{ deleteLink }</a>
                      </td>
                      {
                        Object.keys(expandableData).filter(r => row[r]).length > 0 && (
                          <td colSpan={size(columns) - 1}>
                            <dl>
                              {
                                Object.keys(expandableData).map(key => row[key] &&
                                  <Fragment key={key}>
                                    <dt>{schema[key].title || key}</dt>
                                    <dd>{row[key]}</dd>
                                  </Fragment>
                                )
                              }
                            </dl>
                          </td>
                        )
                      }
                    </tr>
                  )
                }
              </Fragment>

            ))
          }
        </tbody>
      </table>
    );
  }
}

module.exports = Table;
