import React, { useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Fieldset, Snippet } from '@ukhomeoffice/asl-components';

export default function DateSelector({ year }) {
  const { ropsYears } = useSelector(state => state.static);
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

  if (ropsYears.length === 1) {
    return <p><Snippet>fields.year.static</Snippet></p>;
  }

  return (
    <Fragment>
      <form method="POST" ref={form}>
        <Fieldset schema={schema} model={{ year }} onChange={onYearChange} />
      </form>
    </Fragment>

  );
}
