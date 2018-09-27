import React, { Component } from 'react';
import classnames from 'classnames';
import Inset from './inset';

class ConditionalReveal extends Component {
  componentDidMount() {
    this.setState({
      visible: this.props.value === 'true'
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
      <fieldset className="conditional-reveal govuk-fieldset">
        <legend className="govuk-fieldset__legend">
          <h2 className="govuk-fieldset__heading govuk-heading-l">{label}</h2>
        </legend>
        <div className="govuk-radios govuk-radios--inline">
          <div className="govuk-radios__item">
            <input
              type="radio"
              name={`conditional-reveal-${fieldName}`}
              value={true}
              id={`conditional-reveal-${fieldName}-yes`}
              checked={this.state ? this.state.visible : false}
              onChange={this.toggle}
              className="govuk-radios__input"
            />
            <label htmlFor={`conditional-reveal-${fieldName}-yes`} className="govuk-label govuk-radios__label">{yesLabel}</label>
          </div>
          <div className="govuk-radios__item">
            <input
              type="radio"
              name={`conditional-reveal-${fieldName}`}
              value={false}
              id={`conditional-reveal-${fieldName}-no`}
              checked={this.state ? !this.state.visible : false}
              onChange={this.toggle}
              className="govuk-radios__input"
            />
            <label htmlFor={`conditional-reveal-${fieldName}-no`} className="govuk-label govuk-radios__label">{noLabel}</label>
          </div>
        </div>
        <Inset
          className={classnames({
            hidden: this.state && !this.state.visible
          })}
          onChange={e => this.toggle(e)}
        >
          { children }
        </Inset>
      </fieldset>
    );
  }
}

export default ConditionalReveal;
