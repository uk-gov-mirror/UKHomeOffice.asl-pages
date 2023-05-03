# Routers

Exports common routers for handling form submissions, datatable pages and success pages

## Form Router

A router for handling form journeys. GET and POST requests are handled, along with session storage and validation

### Usage

#### `./index.js`
```js
const { routers, page } = require('@asl/pages');
const { form } = routers;

const app = page({
  root: __dirname
});

app.use(form({
  // a js schema object
  schema: require('./schema'),
  // path to redirect to form editing is cancelled
  cancelPath: '/',
  // if true, check fields have changed, if not throw validation error
  checkChanged: false,
  // middleware called on get, can be used to check for
  // session validity before
  checkSession: (req, res, next) => next(),
  // middleware which can be used to configure schema or session
  // req.form.schema and req.session.form[req.model.id] have been set
  configure: (req, res, next) => next(),
  // middleware which can be used to amend the form values after
  // they are returned from the session and model (if editing)
  getValues: (req, res, next) => next(),
  // middleware called after getValues to configure the way validation errors
  // are handled. Standard behaviour is to save them to req.form.validationErrors
  getValidationErrors: (req, res, next) => next(),
  // middleware used to set any custom locals for use in the template
  locals: (req, res, next) => next(),
  // middleware called on POST to configure req.form.values after they
  // are taken from req.body, and before validation
  process: (req, res, next) => next(),
  // custom validation middleware to be called after default validators.
  // note: this is only called if standard validation returns no errors.
  validate: (req, res, next) => next(),
  // middleware used to perform any action after form values have been saved
  // to session. This could be to remove a particular pseudo field
  saveValues: (req, res, next) => {
    delete req.session.form[req.model.id].values.declaration;
    next();
  },
  // action to be performed when form editing is cancelled (when 'clear'
  // is appended to query string)
  cancelEdit = (req, res, next) => next(),
  // action to be performed when 'edit' is appended to query string - usually
  // on a confirm page form to return to the previous step and edit answers
  editAnswers = (req, res, next) => next()
}));

router.use('/', app);
```

#### `./schema/index.js`
```js
module.exports = {
  username: {
    inputType: 'inputText',
    // array of validators, see [validation](../../../lib/validation/README.md)
    // for documentation on available validators
    validate: [
      'required'
    ],
    // default is null
    nullValue: ''
  },
  password: {
    inputType: 'inputPassword',
    validate: [
      'required',
      { minLength: 8 }
    ]
  }
};
```

#### `./views/index.jsx`
```jsx
import React from 'react';
import { FormLayout } from '@ukhomeoffice/asl-components';

const Page = () => (
  <FormLayout>
    <header>
      <h1>title</h1>
    </header>
  </FormLayout>
);

export default Page;

```

## Datatable Router

A router for use on datatable pages which handles filtering, pagination and sorting query params

### Usage

#### `./index.js`
```js
const { routers, page } = require('@asl/pages');
const { datatable } = routers;

const app = page({ root: __dirname });

app.use(datatable({
  // middleware to perform any setup
  configure: (req, res, next) => next(),
  // middleware called to set apiPath if dynamically generated
  getApiPath: (req, res, next) => next(),
  // middleware called after values have been returned from the api
  getValues: (req, res, next) => next(),
  // middleware called after API query string has been constructed
  persistQuery: (req, res, next) => next(),
  // middleware for adding any custom locals
  locals: (req, res, next) => next()
})({
  apiPath: `/establishment/${req.establishmentId}/places`
  schema: require('./schema')
}));

router.use('/', app);
```

#### `./schema/index.js`

```js
module.exports = {
  // include field in model passed to front end
  id: {},
  // render in datatable if show: true
  site: {
    show: true
  },
  area: {
    show: true
  },
  name: {
    show: true
  }
};
```

#### `./views/index.jsx`
```jsx
import React from 'react';
import { Datatable } from '@ukhomeoffice/asl-components';

const formatters = {
  firstName: {
    format: name => name && name.toUpperCase()
  }
}

const Page = () => (
  <Datatable formatters={formatters} />
)

export default Page;
```
