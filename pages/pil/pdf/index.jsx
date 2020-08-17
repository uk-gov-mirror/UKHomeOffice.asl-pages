import React from 'react';
import { createStore } from 'redux';
import { Router } from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import Body from './views';
import Header from '../../common/views/pdf/header';
import Footer from '../../common/views/pdf/footer';
import content from './content';
import PDF from '../../common/helpers/pdf';

const stateReducer = (state = {}) => state;

module.exports = settings => {
  const app = Router();
  const pdf = PDF(settings);

  app.get('/', (req, res, next) => {
    const pil = {
      ...req.pil,
      licenceHolder: req.profile
    };

    const initialState = {
      static: {
        content,
        isPdf: true
      }
    };

    const store = createStore(stateReducer, initialState);
    const body = renderToStaticMarkup(<Body store={store} pil={pil} nonce={res.locals.static.nonce} content={content} />);
    const header = renderToStaticMarkup(<Header store={store} model={pil} licenceType="pil" nonce={res.locals.static.nonce} />);
    const footer = renderToStaticMarkup(<Footer />);

    const hasStatusBanner = pil.status !== 'active';

    pdf({ body, header, footer, hasStatusBanner })
      .then(response => {
        res.attachment(`${req.profile.pilLicenceNumber}.pdf`);
        response.body.pipe(res);
      })
      .catch(next);
  });

  return app;
};
