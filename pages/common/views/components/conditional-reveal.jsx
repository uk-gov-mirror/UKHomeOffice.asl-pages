import React, { Component } from 'react';
import classnames from 'classnames';
import Inset from './inset';

class ConditionalReveal extends Component {
  componentDidMount() {
    const visible = !!this.props.open;
    this.setState({
      visible
    });
    this.toggle = this.toggle.bind(this);
  }

  toggle(e) {
    const visible = e.target.value === 'true';
    this.setState({ visible });
  }

  render() {
    const { fieldName, label, yesLabel, noLabel, children } = this.props;

    return (
      <fieldset className="conditional-reveal">
        <legend className="form-label-bold">{label}</legend>
        <div className="multiple-choice">
          <input
            type="radio"
            name={`conditional-reveal-${fieldName}`}
            value={true}
            id={`conditional-reveal-${fieldName}-yes`}
            checked={!this.state || this.state.visible}
            onChange={this.toggle}
          />
          <label htmlFor={`conditional-reveal-${fieldName}-yes`}>{yesLabel}</label>
        </div>
        <Inset
          className={classnames({
            hidden: this.state && !this.state.visible
          })}
          onChange={e => this.toggle(e)}
        >
          { children }
        </Inset>
        <div className="multiple-choice">
          <input
            type="radio"
            name={`conditional-reveal-${fieldName}`}
            value={false}
            id={`conditional-reveal-${fieldName}-no`}
            checked={this.state && !this.state.visible}
            onChange={this.toggle}
          />
          <label htmlFor={`conditional-reveal-${fieldName}-no`}>{noLabel}</label>
        </div>
      </fieldset>
    );
  }
}

export default ConditionalReveal;
