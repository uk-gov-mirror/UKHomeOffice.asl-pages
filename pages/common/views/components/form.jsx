import React from 'react';
import classnames from 'classnames';
import { map, get } from 'lodash';
import ReactMarkdown from 'react-markdown';
import { TextArea, Input, RadioGroup, Select } from 'govuk-react-components';
import Snippet from '../containers/snippet';
import ConditionalReveal from './conditional-reveal';

const fields = {
  inputText: props => <Input { ...props } />,
  inputEmail: props => <Input type="email" { ...props } />,
  textarea: props => <TextArea { ...props } />,
  radioGroup: props => <RadioGroup { ...props } />,
  checkboxGroup: props => <RadioGroup type="checkbox" { ...props } />,
  select: props => <Select { ...props } />,
  text: props => props.value &&
    <div className={classnames('form-group', props.name)}>
      <h3>{ props.label }</h3>
      <ReactMarkdown>{ props.value }</ReactMarkdown>
    </div>
};

const Form = ({
  schema,
  model,
  csrfToken,
  errors = {},
  onFieldChange
}) => (
  <form method="POST" noValidate>
    {
      map(schema, ({ inputType, conditionalReveal, showIf, accessor, ...props }, key) => {
        const field = fields[inputType]({
          key,
          value: accessor ? get(model[key], accessor) : (model[key] || ''),
          label: <Snippet>{`fields.${key}.label`}</Snippet>,
          hint: <Snippet optional>{`fields.${key}.hint`}</Snippet>,
          name: key,
          error: errors[key] && <Snippet>{`errors.${key}.${errors[key]}`}</Snippet>,
          onChange: e => onFieldChange(key, e.target.value),
          ...props
        });

        if (showIf && !showIf(model)) {
          return null;
        }

        if (conditionalReveal) {
          return (
            <ConditionalReveal
              fieldName={key}
              value={model[`conditional-reveal-${key}`]}
              label={<Snippet>{`fields.${key}.conditionalReveal.label`}</Snippet>}
              yesLabel={<Snippet>{`fields.${key}.conditionalReveal.yesLabel`}</Snippet>}
              noLabel={<Snippet>{`fields.${key}.conditionalReveal.noLabel`}</Snippet>}
            >{ field }</ConditionalReveal>
          );
        }

        return field;
      })

    }
    <input type="hidden" name="_csrf" value={csrfToken} />
    <button type="submit" className="button"><Snippet>buttons.submit</Snippet></button>
  </form>
);

export default Form;
