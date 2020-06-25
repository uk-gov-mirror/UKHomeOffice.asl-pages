import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { get } from 'lodash';
import filenamify from 'filenamify';
import { Router } from 'express';
import createStore from '@asl/projects/client/store';
import { getProjectEstablishment } from '../middleware';
import Licence from './views';
import Protocols from './views/protocols';
import NTS from './views/nts';
import Header from '../../common/views/pdf/header';
import Footer from '../../common/views/pdf/footer';
import content from '../../common/content';
import PDF from '../../common/helpers/pdf';

module.exports = settings => {
  const app = Router();
  const pdf = PDF(settings);

  app.use(getProjectEstablishment());

  const setupPdf = (opts = {}) => (req, res, next) => {
    const isFullApplication = !!req.query.application;
    const initialState = {
      project: req.version.data || { title: 'Untitled project' },
      application: {
        schemaVersion: req.project.schemaVersion,
        establishment: req.project.establishment,
        project: req.project,
        isGranted: true,
        readonly: true,
        showConditions: !isFullApplication,
        isFullApplication: isFullApplication && req.project.schemaVersion > 0
      },
      static: {
        content,
        isPdf: true
      }
    };

    req.pdf = opts;

    req.pdf.store = createStore(initialState);
    req.pdf.nonce = res.locals.static.nonce;

    req.pdf.header = renderToStaticMarkup(<Header store={req.pdf.store} model={req.project} licenceType="ppl" nonce={req.pdf.nonce} version={req.version} />);
    req.pdf.footer = renderToStaticMarkup(<Footer />);
    req.pdf.hasStatusBanner = req.project.status !== 'active' || (req.project.status === 'active' && req.project.granted.id !== req.version.id);

    next();
  };

  const convertToPdf = (req, res, next) => {
    return pdf(req.pdf)
      .then(response => {
        const filename = filenamify(req.pdf.filename || get(req.version, 'data.title') || 'Untitled project');
        res.attachment(`${filename}.pdf`);
        response.body.pipe(res);
      })
      .catch(next);
  };

  const renderLicence = (req, res, next) => {
    req.pdf.body = renderToStaticMarkup(<Licence store={req.pdf.store} nonce={req.pdf.nonce} />);
    next();
  };

  const renderNts = (req, res, next) => {
    req.pdf.body = renderToStaticMarkup(<NTS store={req.pdf.store} nonce={req.pdf.nonce} schemaVersion={req.project.schemaVersion} />);
    req.pdf.filename = `${get(req.version, 'data.title', 'Untitled project')} NTS`;
    next();
  };

  const renderProtocols = (req, res, next) => {
    req.pdf.body = renderToStaticMarkup(<Protocols store={req.pdf.store} nonce={req.pdf.nonce} />);
    req.pdf.filename = `Summary table of steps and adverse effects - ${get(req.version, 'data.title', 'Untitled project')}`;
    next();
  };

  app.get('/nts',
    setupPdf(),
    renderNts,
    convertToPdf
  );

  app.get('/protocols',
    setupPdf({ landscape: true }),
    renderProtocols,
    convertToPdf
  );

  app.get('/',
    setupPdf(),
    renderLicence,
    convertToPdf
  );

  return app;
};
