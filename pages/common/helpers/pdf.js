const fetch = require('r2');

module.exports = settings => ({ body, header, footer, hasStatusBanner, landscape = false }) => {

  const params = {
    method: 'POST',
    json: {
      template: body,
      noRender: true,
      pdfOptions: {
        landscape,
        displayHeaderFooter: true,
        headerTemplate: header,
        footerTemplate: footer,
        margin: {
          top: hasStatusBanner ? 150 : 100,
          left: 25,
          right: 25,
          bottom: 125
        }
      }
    }
  };

  return fetch(`${settings.pdfService}/convert`, params).response
    .then(response => {
      if (response.status > 299) {
        throw new Error(`Error generating PDF - generator responded ${response.status}`);
      }
      return response;
    });

};
