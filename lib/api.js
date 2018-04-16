const fetch = require('r2');

module.exports = (root, defaults) => {

  return (path, options) => {

    const url = root + path;
    options = Object.assign({}, defaults, options);

    return fetch(url, options).response
      .then(response => {
        return response.json()
          .then(json => {
            if (response.status > 399) {
              const err = new Error(json.message);
              Object.assign(err, json);
              throw err;
            }
            return json;
          })
          .then(json => {
            return {
              url,
              status: response.status,
              json: json
            };
          });
      });

  };

};
