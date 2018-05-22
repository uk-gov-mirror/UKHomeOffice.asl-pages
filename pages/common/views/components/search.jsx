import React from 'react';

class Search extends React.Component {

  componentDidMount() {
    this.setState({ value: this.props.filter });
  }

  submit(e) {
    e.preventDefault();
    this.props.onChange(this.state.value);
  }

  render() {
    return (
      <form onSubmit={e => this.submit(e)}>
        <div className="grid-row">
          <div className="column-two-thirds">
            <div className="form-group search-box">
              <label className="form-label" htmlFor="filter">
                <span className="form-label-bold">{this.props.label || 'Search'}</span>
                { this.props.hint && <span className="form-hint">{this.props.hint}</span> }
              </label>
              <p>
                <input
                  className="form-control"
                  id="filter"
                  name="filter"
                  type="text"
                  value={ this.state ? this.state.value : this.props.filter }
                  onChange={e => this.setState({ value: e.target.value })}
                />
                <button type="submit"></button>
              </p>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Search;
