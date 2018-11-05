const assert = require('assert');

describe('Create PIL', () => {
  it('can load', () => {
    const TITLE = 'Choose personal licence (PIL) category';
    browser.url('/pages/pil/create');
    const title = browser.getText('h1');
    assert.equal(title, TITLE);
  });

  it('displays the name of the establishment', () => {
    const ESTABLISHMENT = 'University of Croydon';
    browser.url('/pages/pil/create');
    const establishment = browser.$('h2').getText();
    assert.equal(establishment, ESTABLISHMENT);
  });

  it('redirects to the pil/:id route when A-F category clicked', () => {
    const TITLE = 'Apply for personal licence - Categories A, B, C, D and F';
    browser.url('/pages/pil/create');
    browser.$('button=Apply now').click();
    const title = browser.getText('h1');
    assert.equal(title, TITLE);
  });
});
