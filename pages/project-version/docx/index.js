const { Router } = require('express');
const { Packer } = require('@joefitter/docx');
const renderer = require('@asl/projects/client/components/download-link/renderers/docx-renderer').default;
const schema = require('@asl/projects/client/schema').default;

const pack = doc => {
  const packer = new Packer(doc);
  return packer.toBuffer(doc);
};

module.exports = () => {
  const app = Router();

  app.get('/', (req, res, next) => {
    const values = req.version.data;
    const establishment = req.project.establishment;
    const sections = Object.values(schema[req.project.schemaVersion]);

    renderer({ establishment }, sections, values)
      .then(pack)
      .then(buffer => {
        res.attachment(`${values.title || 'Untitled project'}.docx`);
        res.end(Buffer.from(buffer));
      })
      .catch(next);
  });

  return app;
};
