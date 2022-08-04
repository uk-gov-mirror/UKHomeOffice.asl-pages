import React from 'react';
import { createStore } from 'redux';
import { Router } from 'express';
import filenamify from 'filenamify';
import { renderToStaticMarkup } from 'react-dom/server';
import groupBy from 'lodash/groupBy';
import Body from './views';
import Header from '../../common/views/pdf/header';
import Footer from '../../common/views/pdf/footer';
import { populateNamedPeople } from '../../common/middleware';
import content from './content';
import PDF from '../../common/helpers/pdf';

const namedPeople = establishment => {
  const profiles = {};

  ['pelh', 'nprc', 'nio', 'ntco', 'nvs', 'nacwo'].forEach(roleType => {
    profiles[roleType] = establishment.roles.filter(role => role.type === roleType).map(role => role.profile);
  });

  return profiles;
};

const stateReducer = (state = {}) => state;

module.exports = settings => {
  const app = Router({ mergeParams: true });
  const pdf = PDF(settings);

  app.get('/', populateNamedPeople);

  app.get('/', (req, res, next) => {
    const establishment = {
      ...req.establishment,
      namedPeople: namedPeople(req.establishment)
    };

    const initialState = {
      static: {
        content,
        isPdf: true
      }
    };

    req.api(`/establishment/${req.establishmentId}/places?limit=10000&sort=site`)
      .then(response => {
        establishment.places = groupBy(response.json.data, 'site');
      })
      .then(() => {
        const store = createStore(stateReducer, initialState);
        const body = renderToStaticMarkup(<Body establishment={establishment} nonce={res.locals.static.nonce} content={content} />);
        const header = renderToStaticMarkup(<Header store={store} model={establishment} licenceType="pel" nonce={res.locals.static.nonce} />);
        const footer = renderToStaticMarkup(<Footer />);

        const hasStatusBanner = establishment.status !== 'active';

        pdf({ body, header, footer, hasStatusBanner })
          .then(response => {
            res.attachment(`${filenamify(establishment.name)}.pdf`);
            response.body.pipe(res);
          })
          .catch(next);
      })
      .catch(next);

  });

  return app;
};
