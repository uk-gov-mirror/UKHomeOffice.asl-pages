const assert = require('assert');

describe('Profile Page', () => {
  it('can load', () => {
    browser.url('/pages/profile/view');
    const title = browser.getText('h1');
    assert.equal(title, 'Leonard Martin');
  });
});
