const beforeYouApply = require('./before-you-apply');

module.exports = {
  beforeYouApply: {
    path: '/before-you-apply',
    router: beforeYouApply,
    breadcrumb: false
  }
};
