import React from 'react';
import fetch from 'r2';
import { Router } from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import createStore from '@asl/projects/client/store';
import { getProjectEstablishment } from '../middleware';
import App from './views';
import Header from '../../common/views/pdf/header';
import Footer from '../../common/views/pdf/footer';

module.exports = settings => {
  const app = Router();

  app.use(getProjectEstablishment());

  app.get('/', (req, res, next) => {
    const initialState = {
      project: req.version.data || { title: 'Untitled project' },
      application: {
        schemaVersion: req.project.schemaVersion,
        establishment: req.project.establishment,
        project: req.project,
        isGranted: true,
        readonly: true,
        showConditions: true
      }
    };
    const store = createStore(initialState);
    const html = renderToStaticMarkup(<App store={store} nonce={res.locals.static.nonce} />);
    const header = renderToStaticMarkup(<Header model={req.version.project} licenceType="ppl" nonce={res.locals.static.nonce} />);
    const footer = renderToStaticMarkup(<Footer />);

    const hasStatusBanner = req.version.project.status !== 'active';

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
