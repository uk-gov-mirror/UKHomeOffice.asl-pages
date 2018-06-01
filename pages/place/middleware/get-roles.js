module.exports = req => {
  return req.api(`/establishment/${req.establishment}/roles?where%5Btype%5D=nacwo`)
    .then(response => Promise.resolve(response.json.data))
    .catch(err => Promise.reject(err));
};
