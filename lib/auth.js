const Keycloak = require('keycloak-connect');
const {Router} = require('express');

module.exports = settings => {

  const router = Router();

  const config = {
    realm: settings.realm,
    'auth-server-url': settings.url,
    'ssl-required': 'external',
    resource: settings.client,
    credentials: {
      secret: settings.secret
    },
    bearerOnly: settings.bearerOnly
  };

  const keycloak = new Keycloak({ store: settings.store }, config);

  keycloak.accessDenied = (req, res, next) => {
    const e = new Error('Access Denied');
    e.status = 403;
    next(e);
  }

  router.use(keycloak.middleware());
  router.use(keycloak.protect());
  router.use((req, res, next) => {
    const user = req.kauth.grant.access_token;
    req.user = {
      id: user.content.sub,
      firstName: user.content.given_name,
      lastName: user.content.family_name,
      is: role => user.hasRole(role),
      access_token: user.token
    };
    next();
  });

  return {
    middleware: () => router,
    protect: rules => keycloak.protect(rules)
  };
};
