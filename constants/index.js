function getRopsYears(start) {
  let stop = (new Date()).getFullYear() + 1;

  if (process.env.INCLUDE_NEXT_YEAR_ROPS) {
    stop = stop + 1;
  }

  const years = Array.from({ length: stop - start }, (num, i) => start + i);

  return years.reverse();
}

module.exports = {
  dateFormat: {
    short: 'DD/MM/YYYY',
    medium: 'D MMM YYYY',
    long: 'DD MMMM YYYY',
    datetime: 'DD MMMM YYYY HH:mm'
  },
  ropsYears: getRopsYears(2021)
};
