import React from 'react';
import { map, get } from 'lodash';
import { TextArea, Input, RadioGroup, Select } from 'govuk-react-components';
import Snippet from '../containers/snippet';

const fields = {
  inputText: ({ ...props }) => <Input { ...props } />,
  textarea: ({ value, ...props }) => <TextArea { ...props }>{ value }</TextArea>,
  radioGroup: ({ ...props }) => <RadioGroup { ...props } />,
  checkboxGroup: ({ ...props }) => <RadioGroup type="checkbox" { ...props } />,
  select: ({ ...props }) => <Select { ...props } />
};

const Form = ({
  schema,
  model,
  errors = {}
}) => (
  <form method="POST">
    {
      map(schema, ({ inputType, accessor, ...props }, key) =>
        fields[inputType]({
          key,
          value: accessor ? get(model[key], accessor) : (model[key] || ''),
          label: <Snippet>{`fields.${key}.label`}</Snippet>,
          hint: <Snippet optional>{`fields.${key}.hint`}</Snippet>,
          name: key,
          error: errors[key] && <Snippet>{`errors.${key}.${errors[key]}`}</Snippet>,
          ...props
        })
      )
    }
    <button type="submit" className="button"><Snippet>buttons.submit</Snippet></button>
  </form>
);

export default Form;
