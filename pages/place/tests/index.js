const assert = require('assert');

const fields = {
  site: {
    type: 'text',
    value: 'Apollo House'
  },
  area: {
    type: 'text',
    value: '1st Floor'
  },
  name: {
    type: 'text',
    value: 'C1203'
  },
  suitability: {
    type: 'checkbox',
    value: 'SA',
  },
  holding: {
    type: 'checkbox',
    value: 'NOH'
  },
  nacwo: {
    type: 'select',
    value: 'Brian Proudfoot'
  }
};

const submitForm = browser => {
  browser.$('button[type="submit"]').click();
};

const fillForm = browser => {
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    switch (field.type) {
      case 'checkbox':
        return browser.$(`[value="${field.value}"]`).click();
      case 'select':
        return browser.$(`[name="${key}"]`)
          .selectByVisibleText(field.value);
      default:
        return browser.$(`[name="${key}"]`).setValue(field.value);
    }
  });
};

describe('Place', () => {
  describe('List', () => {
    it('can load', () => {
      browser.url('/pages/place');
      const title = browser.getText('h1');
      assert.equal(title, 'Licensed premises');
    });

    it('contains one model', () => {
      browser.url('/pages/place');
      const tr = browser.$$('table tbody tr');
      assert.equal(tr.length, 1);
    });

    it('amend/delete are not visible on load', () => {
      browser.url('/pages/place');
      const tr = browser.$('table tbody tr');
      assert.equal(tr.$('a=Amend').isVisible(), false);
      assert.equal(tr.$('a=Delete').isVisible(), false);
    });

    it('amend/remove are shown after row clicked', () => {
      browser.url('/pages/place');
      const tr = browser.$('table tbody tr');
      tr.click();
      assert(tr.$('a=Amend').isVisible());
      assert(tr.$('a=Delete').isVisible());
    });

    it('redirects to :id/edit if amend clicked', () => {
      browser.url('/pages/place');
      const tr = browser.$('table tbody tr');
      tr.click();
      browser.click('a=Amend');
      const url = browser.getUrl();
      assert(url.includes('/e5bf4c70-7089-11e8-b004-ed424b0c6bd8/edit'));
    });

    it('redirects to :id/delete if delete clicked', () => {
      browser.url('/pages/place');
      const tr = browser.$('table tbody tr');
      tr.click();
      browser.click('a=Delete');
      const url = browser.getUrl();
      assert(url.includes('/e5bf4c70-7089-11e8-b004-ed424b0c6bd8/delete'));
    });

    it('redirects to /create if create clicked', () => {
      browser.url('/pages/place');
      browser.click('a=Create approved area');
      const url = browser.getUrl();
      assert(url.includes('/create'));
    });
  });

  describe('Create', () => {
    beforeEach(() => {
      browser.url('/pages/place/create?clear=true');
    });

    it('can load', () => {
      browser.url('/pages/place/create');
      const title = browser.getText('h1');
      assert.equal(title, 'Add new premises');
    });

    it('redirects to /create if confirm page is hit without submission', () => {
      browser.url('/pages/place/create/confirm');
      assert(!!browser.getUrl().match(/\/pages\/place\/create$/));
    });

    it('throws multiple validation errors if sumitted empty', () => {
      browser.url('/pages/place/create');
      browser.$('button[type="submit"]').click();
      const errors = browser.$('.error-summary');
      assert(errors.isExisting());
      const fields = ['site', 'name', 'suitability', 'holding', 'nacwo'];
      fields.forEach(field => {
        assert(errors.$(`[href="#${field}"]`).isExisting());
      });
    });

    it('redirects to /confirm page if form filled', () => {
      browser.url('/pages/place/create');
      fillForm(browser);
      submitForm(browser);
      const url = browser.getUrl();
      assert(url.includes('/pages/place/create/confirm'));
    });

    it('persists values', () => {
      browser.url('/pages/place/create');
      fillForm(browser);
      submitForm(browser);
      browser.url('/pages/place/create');
      assert.equal(browser.$('[name="site"]').getValue(), 'Apollo House');
    });

    it('shows a summary of the added fields', () => {
      browser.url('/pages/place/create');
      fillForm(browser);
      submitForm(browser);
      Object.keys(fields).forEach(key => {
        const { value } = fields[key];
        return assert(browser.$(`dd=${value}`).isExisting());
      });
    });

    it('shows an error if you submit without checking the declaration checkbox', () => {
      browser.url('/pages/place/create');
      fillForm(browser);
      submitForm(browser);
      submitForm(browser);
      const errors = browser.$('.error-summary');
      assert(errors.$('[href="#declaration"]').isExisting());
    });

    it('redirects to success page on successful submission', () => {
      browser.url('/pages/place/create');
      fillForm(browser);
      submitForm(browser);
      browser.$('[name="declaration"]').click();
      submitForm(browser);
      const url = browser.getUrl();
      assert(url.includes('/pages/place/create/success'));
    });

    it('clears session on successful submission', () => {
      browser.url('/pages/place/create');
      fillForm(browser);
      submitForm(browser);
      browser.$('[name="declaration"]').click();
      submitForm(browser);
      browser.url('/pages/place/create');
      assert.equal(browser.$('[name="site"]').getValue(), '');
    });
  });

  describe('Read', () => {
    it('can load', () => {
      browser.url('/pages/place/an-id');
      const title = browser.getText('h2');
      assert.equal(title, '1st Floor 20.15');
    });

    it('displays the NACWO by name', () => {
      browser.url('/pages/place/an-id');
      const nacwo = browser.$('dd=Benjamin Patton');
      assert(nacwo.isExisting());
    });
  });

  describe('Update', () => {
    beforeEach(() => {
      // clear session
      browser.url('/pages/place/an-id/edit?clear=true');
    })

    it('can load', () => {
      browser.url('/pages/place/an-id/edit')
      const title = browser.getText('h1');
      assert.equal(title, 'Change licensed premises');
    });

    it('redirects to /create if confirm page is hit without submission', () => {
      browser.url('/pages/place/an-id/edit/confirm');
      assert(!!browser.getUrl().match(/\/pages\/place\/an-id\/edit$/));
    });

    it('displays an error if the form is submitted with no changes', () => {
      browser.url('/pages/place/an-id/edit')
      browser.$('button[type="submit"]').click();
      const errors = browser.$('.error-summary');
      assert(errors.getText().includes('No changes have been made'));
    });

    it('redirects you to the confirm page if changes have been made', () => {
      browser.url('/pages/place/an-id/edit')
      browser.$('[name="name"]').setValue('New Name');
      submitForm(browser);
      const title = browser.getText('h1');
      const changedField = browser.$('table').$('td=New Name');
      assert.equal(title, 'Confirm changes');
      assert(changedField.isExisting());
    });

    it('persists changes', () => {
      browser.url('/pages/place/an-id/edit');
      browser.$('[name="name"]').setValue('New Name');
      submitForm(browser);
      browser.url('/pages/place/an-id/edit');
      assert.equal(browser.$('[name="name"]').getValue(), 'New Name');
    });

    it('shows an error if you submit without checking the declaration checkbox', () => {
      browser.url('/pages/place/an-id/edit');
      browser.$('[name="name"]').setValue('New Name');
      submitForm(browser);
      submitForm(browser);
      const errors = browser.$('.error-summary');
      assert(errors.$('[href="#declaration"]').isExisting());
    });

    it('redirects to success page on successful submission', () => {
      browser.url('/pages/place/an-id/edit');
      browser.$('[name="name"]').setValue('New Name');
      submitForm(browser);
      browser.$('[name="declaration"]').click();
      submitForm(browser);
      const url = browser.getUrl();
      assert(url.includes('/pages/place/an-id/edit/success'));
    });

    it('clears session on successful submission', () => {
      browser.url('/pages/place/an-id/edit');
      browser.$('[name="name"]').setValue('New Name');
      submitForm(browser);
      browser.$('[name="declaration"]').click();
      submitForm(browser);
      browser.url('/pages/place/an-id/edit');
      assert.equal(browser.$('[name="name"]').getValue(), '1st Floor 20.15');
    });
  });

  describe('Delete', () => {
    it('can load', () => {
      browser.url('/pages/place/an-id/delete');
      const title = browser.getText('h1');
      assert.equal(title, 'Remove premises');
    });

    it('redirects to confirm page on submit', () => {
      browser.url('/pages/place/an-id/delete');
      submitForm(browser);
      assert(browser.getUrl().includes('/delete/confirm'));
    });

    it('shows an error if submitted without checking the declaration checkbox', () => {
      browser.url('/pages/place/an-id/delete');
      submitForm(browser);
      submitForm(browser);
      assert(browser.$('.error-summary').$('[href="#declaration"]').isExisting())
    });

    it('redirects to the success page if submission successful', () => {
      browser.url('/pages/place/an-id/delete');
      submitForm(browser);
      browser.$('[name="declaration"]').click();
      submitForm(browser);
      const url = browser.getUrl();
      assert(url.includes('/pages/place/an-id/delete/success'));
    });
  });
});
