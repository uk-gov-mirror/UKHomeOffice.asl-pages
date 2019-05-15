import React from 'react';
import fetch from 'r2';
import { Router } from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import createStore from '@asl/projects/client/store';
import App from './views';
import Header from './views/header';
import Footer from './views/footer';

module.exports = settings => {
  const app = Router();

  app.get('/', (req, res, next) => {
    const initialState = {
      project: req.version.data,
      application: {
        schemaVersion: req.version.project.schemaVersion,
        readonly: true
      }
    };
    const store = createStore(initialState);
    const html = renderToStaticMarkup(<App store={store} nonce={res.locals.static.nonce} />);
    const header = renderToStaticMarkup(<Header project={req.version.project} nonce={res.locals.static.nonce} />);
    const footer = renderToStaticMarkup(<Footer />);

    const hasStatusBanner = () => req.version.project.status !== 'active';

    const params = {
      method: 'POST',
      json: {
        template: html,
        pdfOptions: {
          displayHeaderFooter: true,
          headerTemplate: header,
          footerTemplate: footer,
          margin: {
            top: hasStatusBanner() ? 180 : 100,
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
          res.attachment(`${req.project.title}.pdf`);
          response.body.pipe(res);
        } else {
          throw new Error('Error generating PDF');
        }
      })
      .catch(next);
  });

  return app;
};
