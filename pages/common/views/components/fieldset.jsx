import React, { Component } from 'react';
import { map, get, without } from 'lodash';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { TextArea, Input, CheckboxGroup, RadioGroup, Select, DateInput } from '@ukhomeoffice/react-components';
import Snippet from '../containers/snippet';
import ConditionalReveal from './conditional-reveal';

const fields = {
  inputText: props => <Input { ...props } />,
  inputEmail: props => <Input type="email" { ...props } />,
  inputPassword: props => <Input type="password" { ...props } />,
  inputDate: props => <DateInput { ...props } />,
  textarea: props => <TextArea { ...props } />,
  radioGroup: props => <RadioGroup { ...props } />,
  checkboxGroup: props => <CheckboxGroup { ...props } />,
  select: props => <Select { ...props } />,
  text: props => props.value &&
    <div className={classnames('govuk-form-group', props.name)}>
      <h3>{ props.label }</h3>
      <ReactMarkdown>{ props.value }</ReactMarkdown>
    </div>,
  dateInput: props => <DateInput { ...props } />
};

class Fieldset extends Component {
  componentDidMount() {
    this.setState({
      model: this.props.model || {}
    });

    this.onFieldChange = this.onFieldChange.bind(this);
  }

  onFieldChange(key, value) {
    const setValue = (field, value) => {
      if (Array.isArray(field)) {
        if (field.includes(value)) {
          return without(field, value);
        }
        return [ ...field, value ];
      }
      return value;
    };

    const model = {
      ...this.state.model,
      [key]: setValue(this.state.model[key], value)
    };

    this.setState({ model });
  }

  render() {
    const {
      schema,
      errors = {}
    } = this.props;
    const values = (this.state && this.state.model) || this.props.model;
    return (
      <fieldset>
        {
          map(schema, ({ inputType, label, conditionalReveal, showIf, accessor, format, ...props }, key) => {
            const value = accessor ? get(values[key], accessor) : (values[key] || '');
            console.log(inputType);
            const field = fields[inputType]({
              key,
              value: format ? format(value) : value,
              label: label || <Snippet>{`fields.${key}.label`}</Snippet>,
              hint: <Snippet optional>{`fields.${key}.hint`}</Snippet>,
              name: key,
              error: errors[key] && <Snippet>{`errors.${key}.${errors[key]}`}</Snippet>,
              onChange: e => this.onFieldChange(key, e.target.value),
              ...props
            });

            if (showIf && !showIf(values)) {
              return null;
            }

            // TODO: replace previous instances of conditionalReveal with reveal property of checkboxGroup
            if (conditionalReveal) {
              return (
                <ConditionalReveal
                  fieldName={key}
                  value={values[`conditional-reveal-${key}`]}
                  label={<Snippet>{`fields.${key}.conditionalReveal.label`}</Snippet>}
                  yesLabel={<Snippet>{`fields.${key}.conditionalReveal.yesLabel`}</Snippet>}
                  noLabel={<Snippet>{`fields.${key}.conditionalReveal.noLabel`}</Snippet>}
                >{ field }</ConditionalReveal>
              );
            }

            return field;
          })
        }
      </fieldset>
    );
  }
}

export default Fieldset;
