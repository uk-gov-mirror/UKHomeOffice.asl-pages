const assert = require('assert');

describe('Establishment Dashboard', () => {

  it('can load', () => {
    browser.url('/pages/establishment/dashboard');
    const title = browser.getText('h1');
    assert.equal(title, 'University of Croydon');
  });

  it('can access the profile of the licence holder from the sidebar', () => {
    browser.url('/pages/establishment/dashboard');
    browser.$('.sidebar').$('a=Leonard Martin').click();
    const title = browser.getText('h1');
    assert.equal(title, 'Leonard Martin');
  });

});
