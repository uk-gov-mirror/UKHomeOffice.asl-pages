const assert = require('assert');

describe('Establishment Details Page', () => {

  it('collapsible content is collapsed by default', () => {
    browser.url('/pages/establishment/details');
    const visible = browser.isVisible('.expanding-panel .content');
    const exists = browser.isExisting('.expanding-panel .content');
    // force to an array because browser.isVisible can return single value *or* an array depending on state
    [].concat(visible).forEach(v => {
      assert.equal(v, false);
    });
    [].concat(exists).forEach(v => {
      assert.equal(v, true);
    });
  });

});
