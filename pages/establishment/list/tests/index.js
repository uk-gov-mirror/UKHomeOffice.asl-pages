const assert = require('assert');

describe('Establishment List', () => {
  it('can load', () => {
    browser.url('/pages/establishment/list');
    const title = browser.getText('h1');
    assert.equal(title, 'Establishments');
  });
});
