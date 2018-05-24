const path = require('path');

const pages = require('../helpers/pages')();

describe('pages', () => {

  Object.keys(pages).forEach(page => {
    const testpath = path.resolve(__dirname, '../../../', page, 'tests');
    try {
      require(testpath);
    } catch (e) {}
  });

});
