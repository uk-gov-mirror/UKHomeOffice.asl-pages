const establishment = require('./establishment.json');
const fixtures = [
  {
    url: /^\/establishments?\/[a-z0-9-]+$/,
    response: establishment
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/places?\/[a-z0-9-]+$/,
    response: require('./place.json')
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/roles?$/,
    response: require('./nacwos.json')
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/profiles?\/[a-z0-9-]+$/,
    response: require('./profile.json')
  }
];

module.exports = url => {
  const data = fixtures.reduce((r, fixture) => {
    return r || (url.match(fixture.url) && fixture.response);
  }, null);

  return Promise.resolve({
    json: {
      data,
      meta: { establishment }
    }
  });
};
