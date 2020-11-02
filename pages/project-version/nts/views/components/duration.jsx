import React from 'react';
import get from 'lodash/get';
import isInteger from 'lodash/isInteger';

export default function Duration({ version }) {
  const value = version['duration'];
  let months = get(value, 'months');
  let years = get(value, 'years');

  months = isInteger(months) ? months : 0;
  years = isInteger(years) ? years : 5;

  if (months > 12) {
    months = 0;
  }

  if (years >= 5 || (!months && !years)) {
    years = 5;
    months = 0;
  }

  return <p>{`${years} years ${months} months`}</p>;
}
