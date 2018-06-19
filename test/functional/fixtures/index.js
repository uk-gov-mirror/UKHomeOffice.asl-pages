const fixtures = [
  {
    url: /^\/establishments?\/[a-z0-9-]+$/,
    response: require('./establishment.json')
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/places?\/[a-z0-9-]+$/,
    response: require('./place.json')
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/roles?$/,
    response: require('./nacwos.json')
  }
];

module.exports = url => {
  console.log(url);
  const data = fixtures.reduce((r, fixture) => {
    return r || (url.match(fixture.url) && fixture.response);
  }, null);

  return Promise.resolve({ json: { data } });
};
