import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { get } from 'lodash';
import filenamify from 'filenamify';
import { Router } from 'express';
import createStore from '@asl/projects/client/store';
import { getProjectEstablishment, loadRa } from '../middleware';
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
    const versionData = req.version.data || { title: 'Untitled project' };
    versionData.raCompulsory = req.version.raCompulsory;

    const initialState = {
      project: versionData,
      application: {
        schemaVersion: req.project.schemaVersion,
        establishment: req.project.establishment,
        project: req.project,
        isGranted: true,
        readonly: true,
        showConditions: !isFullApplication,
        isFullApplication: isFullApplication && req.project.schemaVersion > 0,
        raCompulsory: req.version.raCompulsory,
        licenceHolder: req.version.licenceHolder,
        includeDraftRa: req.query.draftRa === 'true'
      },
      static: {
        content,
        imageRoot: settings.attachments,
        isPdf: true
      }
    };

    req.pdf = opts;

    req.pdf.store = createStore(initialState);
    req.pdf.nonce = res.locals.static.nonce;

    const versionSuperseded = req.project.status === 'active' && req.project.granted.id !== req.version.id;

    // nts pdf only needs banner if superseded or draft, licence pdf needs banner whenever it's not current active
    req.pdf.hasStatusBanner = opts.isNts
      ? (versionSuperseded || req.project.status === 'inactive')
      : (versionSuperseded || req.project.status !== 'active');

    req.pdf.header = renderToStaticMarkup(<Header
      store={req.pdf.store}
      model={req.project}
      licenceType="ppl"
      nonce={req.pdf.nonce}
      version={req.version}
      officialSensitive={req.pdf.officialSensitive}
      hasStatusBanner={req.pdf.hasStatusBanner}
    />);
    req.pdf.footer = renderToStaticMarkup(<Footer
      officialSensitive={req.pdf.officialSensitive}
    />);

    next();
  };

  const convertToPdf = (req, res, next) => {
    return pdf(req.pdf)
      .then(response => {
        const isFullApplication = !!req.query.application && req.project.schemaVersion > 0;
        const isPreview = req.version.status !== 'granted';
        const isAmendment = req.project.status === 'active' && req.version.status !== 'granted';

        let filename = get(req.version, 'data.title') || 'Untitled project';

        if (isFullApplication) {
          filename = `${filename} (${isAmendment ? 'amendment' : 'application'})`;
        } else if (isPreview) {
          filename = `${filename} (licence preview)`;
        }

        res.attachment(`${filenamify(req.pdf.filename || filename)}.pdf`);
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
    req.pdf.filename = `${get(req.version, 'data.title', 'Untitled project')} (non-technical summary)`;
    next();
  };

  const renderProtocols = (req, res, next) => {
    req.pdf.body = renderToStaticMarkup(<Protocols store={req.pdf.store} nonce={req.pdf.nonce} />);
    req.pdf.filename = `${get(req.version, 'data.title', 'Untitled project')} (protocol steps)`;
    next();
  };

  app.get('/nts',
    loadRa,
    setupPdf({ officialSensitive: false, isNts: true }),
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
