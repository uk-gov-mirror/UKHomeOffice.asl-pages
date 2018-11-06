const assert = require('assert');
const content = require('../content').pil;

describe('Update PIL', () => {
  it('can load', () => {
    browser.url('/pages/pil/update');
    const title = browser.getText('h1');
    assert.equal(title, content.title);
  });

  it('doesn\'t have a declaration checkbox or submit button if incomplete', () => {
    browser.url('/pages/pil/update');
    const declaration = browser.$('.application-confirm');
    assert(!declaration.isExisting());
  });

  it('should have marked "Your details" as completed', () => {
    browser.url('/pages/pil/update');
    // first section is "Your details".
    const section = browser.$('li.section');
    const completed = section.$('label.completed');
    assert(completed.isExisting());
  });
});
