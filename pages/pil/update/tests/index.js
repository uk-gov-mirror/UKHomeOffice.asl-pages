const assert = require('assert');
const content = require('../content').pil;

describe('Update PIL', () => {
  it('can load', () => {
    browser.url('/pages/pil/update');
    const title = browser.getText('h1');
    assert.equal(title, content.title);
  });
});
