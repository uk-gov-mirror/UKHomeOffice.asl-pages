import React from 'react';
import fetch from 'r2';
import { Router } from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import Body from './views';
import Header from '../../common/views/pdf/header';
import Footer from '../../common/views/pdf/footer';
import content from './content';

module.exports = settings => {
  const app = Router();

  app.get('/', (req, res, next) => {
    const pil = {
      ...req.pil,
      licenceHolder: req.profile
    };

    const html = renderToStaticMarkup(<Body pil={pil} nonce={res.locals.static.nonce} content={content} />);
    const header = renderToStaticMarkup(<Header model={pil} licenceType="pil" nonce={res.locals.static.nonce} />);
    const footer = renderToStaticMarkup(<Footer />);

    const hasStatusBanner = req.pil.status !== 'active';

    const params = {
      method: 'POST',
      json: {
        template: html,
        pdfOptions: {
          displayHeaderFooter: true,
          headerTemplate: header,
          footerTemplate: footer,
          margin: {
            top: hasStatusBanner ? 180 : 100,
            left: 25,
            right: 25,
            bottom: 125
          }
        }
      }
    };

    fetch(`${settings.pdfService}/convert`, params)
      .response
      .then(response => {
        if (response.status < 300) {
          res.attachment(`${pil.licenceNumber}.pdf`);
          response.body.pipe(res);
        } else {
          throw new Error('Error generating PDF');
        }
      })
      .catch(next);
  });

  return app;
};
