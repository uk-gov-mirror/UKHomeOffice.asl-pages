const establishment = require('./establishment.json');
const place = require('./place.json');
const nacwos = require('./nacwos.json');
const profile = require('./profile.json');
const project = require('./project.json');

const fixtures = [
  {
    url: /^\/establishments$/,
    response: [establishment]
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+$/,
    response: establishment
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/places?$/,
    response: [place]
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/places?\/[a-z0-9-]+$/,
    response: place
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/roles?$/,
    response: nacwos
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/profiles$/,
    response: [profile]
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/profiles?\/[a-z0-9-]+$/,
    response: profile
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/projects$/,
    response: [project]
  },
  {
    url: /^\/establishments?\/[a-z0-9-]+\/projects?\/[a-z0-9-]+$/,
    response: project
  }
];

module.exports = url => {
  const data = fixtures.reduce((r, fixture) => {
    return r || (url.match(fixture.url) && fixture.response);
  }, null);

  return Promise.resolve({
    json: {
      data,
      meta: {
        establishment,
        total: 50,
        count: 50
      }
    }
  });
};
