import React, { useRef } from 'react';
import { Fieldset } from '@asl/components';
import { ropsYears } from '../../../../constants';

export default function DateSelector({ year }) {
  const form = useRef(null);

  function onYearChange(fields) {
    const { year: newYear } = fields;

    if (newYear && newYear !== year) {
      form.current.submit();
    }
  }

  const options = ropsYears.map(y => ({
    value: y,
    label: `1 January ${y} to 31 December ${y}`
  }));

  const schema = {
    year: {
      inputType: 'select',
      className: 'inline-label',
      options
    }
  };

  return (
    <form method="POST" ref={form}>
      <Fieldset schema={schema} model={{ year }} onChange={onYearChange} />
    </form>
  );
}
