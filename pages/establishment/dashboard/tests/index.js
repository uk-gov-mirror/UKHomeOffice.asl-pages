const assert = require('assert');

describe('Establishment Page', () => {

  it('can load', () => {
    browser.url('/pages/establishment/dashboard');
    const title = browser.getText('h1');
    assert.equal(title, 'University of Croydon');
  });

});
