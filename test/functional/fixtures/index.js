const fixtures = [
  {
    url: /^\/establishment\/[a-z0-9]+$/,
    response: require('./establishment.json')
  }
];

module.exports = url => {
  const data = fixtures.reduce((r, fixture) => {
    return !r && url.match(fixture.url) && fixture.response;
  }, null);

  return Promise.resolve({ json: { data } });
};
