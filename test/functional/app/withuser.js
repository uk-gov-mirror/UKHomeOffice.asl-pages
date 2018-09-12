const express = require('express');

module.exports = (app, user = {}) => {

  const wrapper = express();

  wrapper.use((req, res, next) => {
    req.user = {
      id: user.id || 123,
      profile: {
        allowedActions: {
          8201: [
            'profile.invite',
            'place.create'
          ]
        }
      },
      isAllowed: () => true,
      get: (key) => {
        return {
          establishment: 8201,
          name: user.name || 'User Name'
        }[key];
      },
      is: () => true,
      can: () => Promise.resolve(true)
    };
    next();
  });

  wrapper.use(app);

  return wrapper;

};
