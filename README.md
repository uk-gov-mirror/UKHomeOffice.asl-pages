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

### Content

A middleware function used to set common content to res.locals.static.content

#### Usage

```js
const ui = require('@asl/service/ui');
const { content } = require('@asl/pages');
const app = ui(settings);

app.use(content);
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

see [Routers](pages/common/routers/README.md)
