import React from 'react';

import ApplyChanges from '../containers/apply-changes';

class Search extends React.Component {

  componentDidMount() {
    this.setState({ value: this.props.filter });
  }

  emitChange() {
    this.props.onChange(this.state.value);
  }

  render() {
    return (
      <ApplyChanges
        type="form"
        onApply={() => this.emitChange()}
      >
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <div className="govuk-form-group search-box">
              <label className="govuk-label" htmlFor="filter">{this.props.label || 'Search'}</label>
              { this.props.hint && <span className="govuk-hint">{this.props.hint}</span> }
              <input
                className="govuk-input"
                id="filter"
                name="filter"
                type="text"
                value={ this.state ? this.state.value : this.props.filter }
                onChange={e => this.setState({ value: e.target.value })}
              />
              <button type="submit" className="govuk-button"></button>
            </div>
          </div>
        </div>
      </ApplyChanges>
    );
  }
}

export default Search;
