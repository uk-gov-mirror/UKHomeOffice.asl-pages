module.exports = {
  read: require('./read'),
  extend: require('./extend'),
  removeDeadline: require('./deadline-remove'),
  reinstateDeadline: require('./deadline-reinstate'),
  deadlinePassed: require('./deadline-passed'),
  discard: require('./discard'),
  confirm: require('./confirm'),
  endorse: require('./endorse')
};
