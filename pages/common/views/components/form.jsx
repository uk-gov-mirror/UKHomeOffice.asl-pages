import React, { Fragment } from 'react';
import { map, get } from 'lodash';
import { TextArea, Input, RadioGroup, Select } from 'govuk-react-components';
import Snippet from '../containers/snippet';
import ConditionalReveal from './conditional-reveal';

const fields = {
  inputText: ({ ...props }) => <Input { ...props } />,
  textarea: ({ value, ...props }) => <TextArea value={value} { ...props } />,
  radioGroup: ({ ...props }) => <RadioGroup { ...props } />,
  checkboxGroup: ({ ...props }) => <RadioGroup type="checkbox" { ...props } />,
  select: ({ ...props }) => <Select { ...props } />,
  text: props => props.value &&
    <Fragment>
      <h3>{ props.label }</h3>
      <p>{ props.value }</p>
    </Fragment>
};

const Form = ({
  schema,
  model,
  errors = {},
  onFieldChange
}) => (
  <form method="POST">
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
          console.log(model);
          return null;
        }

        if (conditionalReveal) {
          return (
            <ConditionalReveal
              fieldName={key}
              open={model[key]}
              label={<Snippet>{`fields.${key}.conditionalReveal.label`}</Snippet>}
              yesLabel={<Snippet>{`fields.${key}.conditionalReveal.yesLabel`}</Snippet>}
              noLabel={<Snippet>{`fields.${key}.conditionalReveal.noLabel`}</Snippet>}
            >{ field }</ConditionalReveal>
          );
        }

        return field;
      })

    }
    <button type="submit" className="button"><Snippet>buttons.submit</Snippet></button>
  </form>
);

export default Form;
