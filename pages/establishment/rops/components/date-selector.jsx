import React, { useRef, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Fieldset, Snippet } from '@asl/components';
import { ropsYears } from '../../../../constants';

export default function DateSelector({ year }) {
  const form = useRef(null);
  const { include2022 } = useSelector(state => state.static);
  const years = include2022 ? [2022, ...ropsYears] : ropsYears;

  function onYearChange(fields) {
    const { year: newYear } = fields;

    if (newYear && newYear !== year) {
      form.current.submit();
    }
  }

  const options = years.map(y => ({
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
    <Fragment>
      {
        options.length > 1
          ? (
            <form method="POST" ref={form}>
              <Fieldset schema={schema} model={{ year }} onChange={onYearChange} />
            </form>
          )
          : <p><Snippet>fields.year.static</Snippet></p>
      }
    </Fragment>

  );
}
