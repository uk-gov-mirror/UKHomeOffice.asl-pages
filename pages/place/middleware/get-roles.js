module.exports = req => {
  return req.api(`/establishment/${req.establishment}/roles`, { query: { type: 'nacwo' } })
    .then(response => Promise.resolve(response.json.data))
    .catch(err => Promise.reject(err));
};
