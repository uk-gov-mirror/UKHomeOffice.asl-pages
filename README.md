# asl-pages

Module containing a set of pages used across ASL services, along with the building blocks for creating isomorphic React pages.

## Exports:

### Pages

A map of connected pages/journeys for creating an ASL service

#### Usage:
```js
const ui = require('@asl/service/ui');

const { pages } = require('@asl/pages');
const { establishment, place, profile, project, dashboard } = pages;

const app = ui(settings);

app.use('/e/:establishment/projects', project());
app.use('/e/:establishment/profiles', profile());
app.use('/e/:establishment/places', place());
app.use('/e/:establishment', establishment());
app.use('/', dashboard());

app.listen(port);
```

### Views

Absolute path to common views directory. This is unshifted to an array of express views directories in `@asl/service`;

#### Usage:
```js
const ui = require('@asl/service/ui');
const { views } = require('@asl/pages');

// pass views dir to app to properly mount error pages etc
const app = ui({ ...settings, views });
```

### Page

An express router which can be extended to create a new ASL page. This takes care of setting common properties: rootReducer, content, template, js bundle and URL

#### Usage:
```js
const { page } = require('@asl/pages');

const app = page({
  // this is needed to locate page templates and content
  root: __dirname,
  // an array of allowed subpaths. '/' is always allowed
  paths: ['/confirm', '/success'],
  // any page-specific content, this will extend content
  // provided in __dirname/content
  content: {},
});

router.use('/', page)
```

### Routers

Exports common routers for handling form submissions, datatable pages and success pages

#### Usage

##### `./index.js`
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
  cancelEdit = (req, res, next) => {
    return res.redirect(cancelPath);
  },
  // action to be performed when 'edit' is appended to query string - usually
  // on a confirm page form to return to the previous step and edit answers
  editAnswers = (req, res, next) => {
    return res.redirect(req.baseUrl.replace(/\/confirm/, ''));
  }
}));

router.use('/', app);
```
##### `./views/index.jsx`
```js
import React from 'react';
import { FormLayout } from '@asl/pages/pages/common/views/layouts/datatable';

const Page = () => (
  <FormLayout>
    <header>
      <h1>title</h1>
    </header>
  </FormLayout>
);

export default Page;

```
