function getRopsYears(start) {
  let end = (new Date()).getFullYear();
  // array length should be 1 when start and end are the same
  const years = Array.from({ length: 1 + end - start }, (num, i) => start + i);

  return years.reverse();
}

module.exports = {
  dateFormat: {
    short: 'd/M/yyyy',
    medium: 'd MMM yyyy',
    long: 'd MMMM yyyy',
    datetime: 'd MMMM yyyy h:mm'
  },
  ropsYears: getRopsYears(2021)
};
