import React from 'react';
import fetch from 'r2';
import { Router } from 'express';
import { renderToStaticMarkup } from 'react-dom/server';
import Body from './views';
import Header from '../../common/views/pdf/header';
import Footer from '../../common/views/pdf/footer';
import content from './content';

const namedPeople = establishment => {
  const profiles = {};

  ['pelh', 'holc', 'nprc', 'nio', 'ntco', 'nvs', 'nacwo'].forEach(roleType => {
    profiles[roleType] = establishment.roles.filter(role => role.type === roleType).map(role => role.profile);
  });

  return profiles;
};

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

module.exports = settings => {
  const app = Router({ mergeParams: true });

  app.get('/', (req, res, next) => {
    const establishment = {
      ...req.establishment,
      namedPeople: namedPeople(req.establishment)
    };

    req.api(`/establishment/${req.establishmentId}/places?limit=10000&sort=site`)
      .then(response => {
        establishment.places = groupBy('site')(response.json.data);
      })
      .then(() => {
        const html = renderToStaticMarkup(<Body establishment={establishment} nonce={res.locals.static.nonce} content={content} />);
        const header = renderToStaticMarkup(<Header model={establishment} licenceType="pel" nonce={res.locals.static.nonce} />);
        const footer = renderToStaticMarkup(<Footer />);

        const hasStatusBanner = establishment.status !== 'active';

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
              res.attachment(`${establishment.licenceNumber}.pdf`);
              response.body.pipe(res);
            } else {
              throw new Error('Error generating PDF');
            }
          })
          .catch(next);
      });

  });

  return app;
};
