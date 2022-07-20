const { Router } = require('express');
const { get, pick } = require('lodash');
const { Packer } = require('@joefitter/docx');
const imageSize = require('image-size');
const filenamify = require('filenamify');
const fetch = require('node-fetch');
const renderer = require('@asl/projects/client/components/download-link/renderers/docx-renderer').default;
const schema = require('@asl/projects/client/schema').default;

const MAX_IMAGE_WIDTH = 600;
const MAX_IMAGE_HEIGHT = 800;

const pack = doc => {
  const packer = new Packer(doc);
  return packer.toBuffer(doc);
};

const scaleAndPreserveAspectRatio = (srcWidth, srcHeight, maxWidth, maxHeight) => {
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
  return { width: srcWidth * ratio, height: srcHeight * ratio };
};

const getDataUrl = async (attachmentHost, data) => {
  if (data.src && data.src.match(/^data:/)) {
    return data.src;
  }
  if (attachmentHost && data.token) {
    const response = await fetch(`${attachmentHost}/${data.token}`);
    if (response.status === 200) {
      const base64 = Buffer.from(await response.arrayBuffer()).toString('base64');
      return `data:${response.headers.get('content-type')};base64,${base64}`;
    }
  }
};

const loadImages = attachmentHost => async node => {
  const url = await getDataUrl(attachmentHost, node.data);
  if (!url) {
    return node;
  }
  const src = url.substring(url.indexOf(',') + 1);
  const buffer = Buffer.from(src, 'base64');
  let dimensions = imageSize(buffer);
  dimensions = scaleAndPreserveAspectRatio(
    dimensions.width,
    dimensions.height,
    MAX_IMAGE_WIDTH,
    MAX_IMAGE_HEIGHT
  );
  node.data.width = dimensions.width;
  node.data.height = dimensions.height;
  node.data.src = url;
  return node;
};

module.exports = (settings) => {
  const app = Router();

  app.get('/', (req, res, next) => {
    const values = req.version.data || {};
    const sections = Object.values(schema[req.project.schemaVersion]());

    const application = {
      ...req.project,
      licenceHolder: req.version.licenceHolder,
      establishment: req.project.establishment,
      establishments: [
        pick(req.project.establishment, 'id', 'name')
      ]
    };

    const task = get(req.project, 'openTasks[0]');

    if (task && task.data.action === 'transfer') {
      const receivingEstablishment = get(task, 'data.meta.establishment.to');
      application.establishments.push(pick(receivingEstablishment, 'id', 'name'));
    }

    renderer(application, sections, values, loadImages(settings.attachments))
      .then(pack)
      .then(buffer => {
        const isAmendment = req.project.status === 'active' && req.version.status !== 'granted';
        res.attachment(`${filenamify(values.title || 'Untitled project')} (${isAmendment ? 'amendment' : 'application'}).docx`);
        res.end(Buffer.from(buffer));
      })
      .catch(next);
  });

  return app;
};
