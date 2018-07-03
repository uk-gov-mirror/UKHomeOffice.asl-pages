const assert = require('assert');

describe('Profile List', () => {
  it('can load', () => {
    browser.url('/pages/profile/list');
    const title = browser.getText('h1');
    assert.equal(title, 'People');
  });
});
