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
        return browser.$(`[name="${key}"][value="${field.value}"]`).click();
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
      assert.equal(title, 'Add approved area');
    });

    it('redirects to /create if confirm page is hit without submission', () => {
      browser.url('/pages/place/create/confirm');
      assert(!!browser.getUrl().match(/\/pages\/place\/create$/));
    });

    it('throws multiple validation errors if sumitted empty', () => {
      browser.url('/pages/place/create');
      submitForm(browser);
      const errors = browser.$('.govuk-error-summary');
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
      const errors = browser.$('.govuk-error-summary');
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

    it('strips html tags from user input', () => {
      browser.url('/pages/place/create');
      fillForm(browser);
      browser.$(`[name="site"]`).setValue('<script>window.location="http://www.test.com/"</script>');
      submitForm(browser);
      assert.equal(browser.getText('h1'), 'Confirm addition');
      assert.equal(browser.getText('body').match(/<\/?script>/g), null);
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
      submitForm(browser);
      const errors = browser.$('.govuk-error-summary');
      assert(errors.getText().includes('No changes have been made'));
    });

    it('toggles textarea for editing restrictions using conditional reveal', () => {
      browser.url('/pages/place/an-id/edit');
      const restrictions = browser.$('[name="changesToRestrictions"]');
      assert(restrictions.isExisting());
      assert(!restrictions.isVisible());
      browser.$('[name="conditional-reveal-changesToRestrictions"][value="true"]').click();
      assert(restrictions.isVisible());
    });

    it('renders markdown in restrictions', () => {
      browser.url('/pages/place/an-id/edit');
      assert.equal(browser.$('.restrictions').$$('li').length, 2);
    });

    it('persists conditional reveal state if a validation error is thrown', () => {
      browser.url('/pages/place/an-id/edit');
      browser.$('[name="suitability"][value="SA"]').click();
      const trueRadio = browser.$('[name="conditional-reveal-changesToRestrictions"][value="true"]');
      trueRadio.click();
      submitForm(browser);
      assert(browser.$('.govuk-error-summary').isVisible());
      assert(trueRadio.isSelected());
    });

    it('throws a validation error if user chooses to amend restrictions but doesn\'t add any content', () => {
      browser.url('/pages/place/an-id/edit');
      const trueRadio = browser.$('[name="conditional-reveal-changesToRestrictions"][value="true"]');
      trueRadio.click();
      submitForm(browser);
      assert(browser.$('.govuk-error-summary').$('#changesToRestrictions').isExisting())
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
      const errors = browser.$('.govuk-error-summary');
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

    it('reloads form if CSRF check fails', () => {
      browser.newWindow('/pages/place/an-id/edit', 'tab-1');
      browser.newWindow('/pages/place/an-id/edit', 'tab-2');
      browser.switchTab('tab-1');
      fillForm(browser);
      submitForm(browser);
      const error = browser.getText('.govuk-error-summary');
      assert(error.includes('This form data has been changed somewhere else.'));
    });

    it('redirects to edit page if session expires', () => {
      browser.url('/pages/place/an-id/edit');
      browser.$('[name="name"]').setValue('New Name');
      submitForm(browser);
      browser.deleteCookie();
      browser.refresh()
      const title = browser.getText('h1');
      assert.equal(title, 'Change licensed premises');
    });

    it('doesn\'t throw an error if sessionState query appended to url', () => {
      browser.url('/pages/place/an-id/edit');
      browser.$('[name="name"]').setValue('New Name');
      submitForm(browser);
      browser.deleteCookie();
      browser.url('/pages/place/an-id/edit/confirm?sessionState=123-abc');
      const title = browser.getText('h1');
      assert.equal(title, 'Change licensed premises');
    });

    it('strips html tags from user input', () => {
      browser.url('/pages/place/an-id/edit');
      browser.$(`[name="site"]`).setValue('<script>window.location="http://www.test.com/"</script>');
      submitForm(browser);
      assert.equal(browser.getText('h1'), 'Confirm changes');
      assert.equal(browser.getText('body').match(/<\/?script>/g), null);
    });
  });

  describe('Delete', () => {
    it('can load', () => {
      browser.url('/pages/place/an-id/delete');
      const title = browser.getText('h1');
      assert.equal(title, 'Remove approved area');
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
      assert(browser.$('.govuk-error-summary').$('[href="#declaration"]').isExisting())
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
