const { get } = require('lodash');

const getEstablishment = (req, establishmentId) =>
  req.api(`/establishment/${establishmentId || req.establishmentId}`)
    .then(({ json: { data } }) => {
      const pelhs = data.roles.filter(r => r.type === 'pelh');
      const nprcs = data.roles.filter(r => r.type === 'nprc');
      if (pelhs[0]) {
        data.pelh = pelhs[0].profile;
      }
      if (nprcs[0]) {
        data.nprc = nprcs[0].profile;
      }
      return data;
    })
    .catch(err => Promise.reject(err));

const getNacwos = req =>
  req.api(`/establishments/${req.establishmentId}/roles`, { query: { type: 'nacwo' } })
    .then(({ json: { data } }) => Promise.resolve(data))
    .catch(err => Promise.reject(err));

const getNacwoById = (req, id) =>
  getNacwos(req)
    .then(nacwos => Promise.resolve(nacwos.find(n => get(n, 'profile.id') === id)))
    .then(nacwo => nacwo && nacwo.profile)
    .catch(err => Promise.reject(err));

const getInspectors = req =>
  req.api(`/establishment/${req.establishmentId}/profiles`)
    .then(({ json: { data } }) => {
      return data.filter(p => p.asruInspector);
    })
    .catch(err => Promise.reject(err));

module.exports = {
  getNacwos,
  getNacwoById,
  getEstablishment,
  getInspectors
};
