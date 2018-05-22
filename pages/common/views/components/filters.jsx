import React, { Component } from 'react';
import { map } from 'lodash';
import OptionSelect, { CheckedOption } from 'govuk-react-components/components/option-select';
import { getTitle } from '../../../../lib/utils';

class Filters extends Component {

  componentDidMount() {
    const { filters } = this.props;
    this.setState({ filters }, () => {
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

  clearFilters(e) {
    e.preventDefault();
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

  render() {
    const { filterSettings } = this.props;
    return (
      <section className="filters">
        <h3>Filter by</h3>
        <div className="filters grid-row">
          {
            map(filterSettings, ({ values, format }, key) =>
              <div key={key} className="column-one-third">
                <OptionSelect title={ getTitle(key, filterSettings[key]) }>
                  {
                    values.map((filter, index) =>
                      <CheckedOption
                        key={index}
                        name={`${key}-${index}`}
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
          <button className="button" onClick={() => this.emitChange()}>Apply filters</button>
          <a href="#" onClick={e => this.clearFilters(e)}>Clear filters</a>
        </p>
      </section>
    );
  }
}

export default Filters;
