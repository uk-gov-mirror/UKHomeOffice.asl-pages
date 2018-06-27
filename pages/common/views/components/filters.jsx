import React, { Component } from 'react';
import { OptionSelect, CheckedOption } from 'govuk-react-components';
import classnames from 'classnames';
import { map, some } from 'lodash';
import ApplyChanges from '../containers/apply-changes';
import Snippet from '../containers/snippet';

class Filters extends Component {

  componentDidMount() {
    const { filters } = this.props;

    this.setState({
      filters,
      visible: some(filters, 'length')
    }, () => {
      this.scrollToCheckedElements();
    });
  }

  scrollToCheckedElements() {
    const filters = this.state.filters || {};
    Object.keys(filters).forEach(key => {
      const container = document.getElementById(`${key}-options`);
      const child = document.getElementById(`${key}-${filters[key][0]}`);
      if (container && child) {
        const offset = child.parentNode.offsetTop;
        container.scrollTo(0, offset);
      }
    });
  }

  emitChange() {
    const { filters } = this.state;
    this.props.setFilters(filters);
  }

  clearFilters() {
    this.props.setFilters({});
    this.setState({ filters: {} });
  }

  onCheckboxChange(key, filter, checked) {
    const filters = { ...this.state.filters };
    if (checked) {
      filters[key] = filters[key] || [];
      if (!filters[key].includes(filter)) {
        filters[key].push(filter);
      }
    } else {
      const index = filters[key].indexOf(filter);
      filters[key].splice(index, 1);
    }
    if (!filters[key].length) {
      delete filters[key];
    }
    this.setState({ filters });
  }

  isChecked(key, filter) {
    const { filters } = this.state || this.props;
    return filters[key] && filters[key].includes(filter);
  }

  toggleVisible(e) {
    e.preventDefault();
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const { filterSettings } = this.props;
    return (
      <section className="filters-component">
        <h3 className={classnames({
          'toggle-filter-link': true,
          'filters-hidden': this.state && !this.state.visible
        })}
        >
          <a href="#" onClick={e => this.toggleVisible(e)}><Snippet>filters.filterBy</Snippet></a>
        </h3>
        <section className={classnames({
          hidden: this.state && !this.state.visible
        })}>
          <ApplyChanges
            type="form"
            onApply={() => this.emitChange()}
          >
            <div className="filters grid-row">
              {
                map(filterSettings, ({ values, format }, key) =>
                  <div key={key} className="column-one-third">
                    <OptionSelect
                      title={<Snippet>{`fields.${key}.label`}</Snippet>}
                      id={key}>
                      {
                        values.map((filter, index) =>
                          <CheckedOption
                            key={index}
                            name={`filter-${key}`}
                            id={`${key}-${filter}`}
                            value={filter}
                            onChange={e => this.onCheckboxChange(key, filter, e.target.checked)}
                            checked={!!this.isChecked(key, filter)}
                          >
                            { format ? format(filter) : filter }
                          </CheckedOption>
                        )
                      }
                    </OptionSelect>
                  </div>
                )
              }
            </div>
            <p className="control-bar">
              <button type="submit" className="button"><Snippet>filters.applyLabel</Snippet></button>
              <ApplyChanges
                filters={{}}
                onApply={() => this.clearFilters()}
                label={<Snippet>filters.clearLabel</Snippet>} />
            </p>
          </ApplyChanges>
        </section>

      </section>
    );
  }
}

export default Filters;
