import React from 'react';

export default function Duration({ version }) {
  const duration = version.duration;
  if (!duration) {
    return;
  }
  let yearsLabel = duration.years === 1 ? 'Year' : 'Years';
  let monthsLabel = duration.months === 1 ? 'Month' : 'Months';
  return <p>{`${duration.years} ${yearsLabel} ${duration.months} ${monthsLabel}`}</p>;
}
