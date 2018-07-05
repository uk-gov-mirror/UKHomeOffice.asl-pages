const assert = require('assert');

describe('Profile Page', () => {
  it('can load', () => {
    browser.url('/pages/profile/view');
    const title = browser.getText('h1');
    assert.equal(title, 'Leonard Martin');
  });

  it('renders a hidden training section and shows on title click', () => {
    browser.url('/pages/profile/view');
    const training = browser.$('h3=Training');
    assert(training.isVisible());
    const content = browser.$('dd=BLib');
    assert(!content.isVisible());
    training.click();
    assert(content.isVisible());
  });

  it('renders a hidden projects section and shows on title click', () => {
    browser.url('/pages/profile/view');
    const training = browser.$('h3=Projects');
    assert(training.isVisible());
    const content = browser.$('dt=Oncolytic HSV as an anti-cancer therapy');
    assert(!content.isVisible());
    training.click();
    assert(content.isVisible());
  });
});
