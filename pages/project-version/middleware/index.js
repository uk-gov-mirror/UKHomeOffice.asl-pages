const { get, remove, isEqual, uniq, mapValues, sortBy } = require('lodash');
const isUUID = require('uuid-validate');
const extractComments = require('../lib/extract-comments');
const { mapSpecies, mapPermissiblePurpose, mapAnimalQuantities } = require('@asl/projects/client/helpers');
const diff = require('./diff');

const getVersion = () => (req, res, next) => {
  req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/project-versions/${req.versionId}`)
    .then(({ json: { data, meta } }) => {
      req.project = {
        ...data.project,
        openTasks: meta.openTasks,
        ...req.project
      };
      req.version = data;
    })
    .then(() => next())
    .catch(next);
};

const getComments = (action = 'grant') => (req, res, next) => {
  if (!req.project || !req.project.openTasks || !req.project.openTasks.length) {
    return next();
  }
  const task = get(req.project, 'openTasks', []).find(task => task.data.action === action);
  if (!task) {
    return next();
  }
  req.api(`/tasks/${task.id}`)
    .then(response => extractComments(response.json.data))
    .then(comments => {
      res.locals.static.comments = comments;
    })
    .then(() => next())
    .catch(next);
};

const hasEditPermission = (req) => {
  if (req.user.profile.asruUser) {
    return Promise.resolve();
  }
  const params = {
    id: req.projectId,
    licenceHolderId: req.project.licenceHolderId,
    establishment: req.establishmentId
  };

  return req.user.can('project.update', params);
};

const userCanComment = req => {
  const asruUser = req.user.profile.asruUser;
  const task = get(req.project, 'openTasks[0]');
  if (!task) {
    return Promise.resolve(false);
  }
  return Promise.resolve()
    .then(() => {
      return asruUser ? task.withASRU : (!task.withASRU && hasEditPermission(req));
    });
};

const canComment = () => (req, res, next) => {
  userCanComment(req)
    .then(isCommentable => {
      res.locals.static.isCommentable = isCommentable;
    })
    .then(() => next())
    .catch(next);
};

const traverse = (node, key, keys = []) => {
  if (key) {
    if (key.match(/^reduction-quantities-/)) {
      keys.push('reduction-quantities');
    }
    keys.push(key);
  }
  if (node instanceof Array) {
    node.forEach(o => {
      traverse(o, `${key}${o && o.id ? `.${o.id}` : ''}`, keys);
    });
  } else if (node instanceof Object) {
    Object.keys(node).forEach(k => {
      // don't traverse into text editor objects
      if (get(node[k], 'document.object') === 'document') {
        keys.push(`${key ? `${key}.` : ''}${k}`);
        return;
      }
      traverse(node[k], `${key ? `${key}.` : ''}${k}`, keys);
    });
  }
  return uniq(keys);
};

const getNode = (tree, path) => {
  if (path === 'species') {
    return mapSpecies(tree);
  }
  if (path === 'permissible-purpose') {
    return mapPermissiblePurpose(tree);
  }
  if (path === 'reduction-quantities') {
    return mapAnimalQuantities(tree, 'reduction-quantities');
  }
  if (path.match(/establishments\.(.*)\.establishment-id/)) {
    const id = path.split('.')[1];
    const establishment = (tree.establishments || []).find(e => e.id === id);
    return establishment && (establishment.name || establishment['establishment-name']);
  }
  let keys = path.split('.');
  let node = tree[keys[0]];
  for (let i = 1; i < keys.length; i++) {
    let parent = node;
    if (!parent) {
      return;
    }
    if (isUUID(keys[i])) {
      if (parent instanceof Array) {
        node = parent.find(o => o.id === keys[i]);
      }
    } else {
      node = parent[keys[i]];
    }
  }
  return node;
};

const getFirstVersion = (req, type = 'project-versions') => {
  if (!req.project) {
    return Promise.resolve();
  }
  if (type === 'project-versions') {
    // first version is only used during application process
    if (req.project && req.project.granted) {
      return Promise.resolve();
    }
    // if there are only one or two versions then the first version will be the same as current or previous
    if (req.project.versions.length < 3) {
      return Promise.resolve();
    }
  } else {
    // if there are only one or two ra versions then the first version will be the same as current or previous
    if (req.project.retrospectiveAssessments.length < 3) {
      return Promise.resolve();
    }
  }
  const key = type === 'project-versions' ? 'versions' : 'retrospectiveAssessments';
  const first = sortBy(req.project[key], 'createdAt')[0];
  return getCacheableVersion(req, `/establishments/${req.establishmentId}/projects/${req.projectId}/${type}/${first.id}`)
    // swallow error as this will return 403 for receiving establishment viewing a project transfer version
    // eslint-disable-next-line handle-callback-err
    .catch(err => {});
};

const getPreviousVersion = (req, type = 'project-versions') => {
  if (!req.project) {
    return Promise.resolve();
  }
  const key = type === 'project-versions' ? 'versions' : 'retrospectiveAssessments';
  const model = type === 'project-versions' ? 'version' : 'retrospectiveAssessment';
  const previous = req.project[key]
    // only get versions/ras created after last granted, if granted
    .filter(version => {
      const granted = req.project[key].find(v => v.status === 'granted');
      if (granted) {
        return version.createdAt >= granted.createdAt;
      }
      return true;
    })
    // previous version could be granted or submitted
    .filter(version => version.status === 'submitted' || version.status === 'granted')
    .find(version => version.createdAt < req[model].createdAt);

  if (!previous) {
    return Promise.resolve();
  }
  return getCacheableVersion(req, `/establishments/${req.establishmentId}/projects/${req.projectId}/${type}/${previous.id}`)
    // swallow error as this will return 403 for receiving establishment viewing a project transfer version
    // eslint-disable-next-line handle-callback-err
    .catch(err => {});
};

const getGrantedVersion = (req, type = 'project-versions') => {
  const key = type === 'project-versions' ? 'granted' : 'grantedRa';
  if (!req.project || !req.project[key]) {
    return Promise.resolve();
  }
  return getCacheableVersion(req, `/establishments/${req.establishmentId}/projects/${req.projectId}/${type}/${req.project.granted.id}`)
    // swallow error as this will return 403 for receiving establishment viewing a project transfer
    // eslint-disable-next-line handle-callback-err
    .catch(err => {});
};

const getCacheableVersion = (req, url) => {
  return req.api(url, { maxAge: 300 })
    .then(({ json: { data } }) => data)
    .then(data => {
      return data;
    });
};

const normaliseConditions = (versionData, { isSubmitted }) => {
  return mapValues(versionData, (val, key) => {
    if (key === 'protocols') {
      return val.filter(Boolean).map(protocol => {
        return {
          ...protocol,
          conditions: isSubmitted && sortBy(protocol.conditions, 'key')
        };
      });
    }
    if (key === 'conditions') {
      return isSubmitted && sortBy(val, 'key');
    }
    return val;
  });
};

const getChanges = (current, version) => {
  if (!current || !version) {
    return [];
  }
  const before = normaliseConditions(version.data, { isSubmitted: current.status !== 'draft' });
  const after = normaliseConditions(current.data, { isSubmitted: current.status !== 'draft' });
  const cvKeys = traverse(after);
  const pvKeys = traverse(before);
  const added = remove(cvKeys, k => !pvKeys.includes(k));
  const removed = remove(pvKeys, k => !cvKeys.includes(k));
  let changed = [];
  cvKeys.forEach(k => {
    const pvNode = getNode(before, k);
    const cvNode = getNode(after, k);
    if (hasChanged(pvNode, cvNode)) {
      changed.push(k);
    }
  });
  return added.concat(removed).concat(changed);
};

const hasChanged = (before, after) => {
  // backwards compatibility check for transition from string to object values for RTEs
  if (typeof before === 'string' && typeof after !== 'string') {
    try {
      before = JSON.parse(before);
    } catch (e) {}
  }
  return !isEqual(before, after);
};

const getAllChanges = (type = 'project-versions') => (req, res, next) => {
  const model = type === 'project-versions' ? 'version' : 'retrospectiveAssessment';
  Promise.all([
    getFirstVersion(req, type),
    getPreviousVersion(req, type),
    getGrantedVersion(req, type)
  ])
    .then(([firstVersion, previousVersion, grantedVersion]) => {
      return {
        first: getChanges(req[model], firstVersion),
        latest: getChanges(req[model], previousVersion),
        granted: getChanges(req[model], grantedVersion)
      };
    })
    .then(changes => {
      res.locals.static.changes = changes;
    })
    .then(() => next())
    .catch(next);
};

const getChangedValues = (question, req, type = 'project-versions') => {

  const model = type === 'project-versions' ? 'version' : 'retrospectiveAssessment';

  const getVersion = {
    latest: getPreviousVersion,
    granted: getGrantedVersion,
    first: getFirstVersion
  };
  return Promise.resolve()
    .then(() => getVersion[req.query.version](req, type))
    .then(async (result) => {
      const value = result && getNode(result.data, question);
      const current = getNode(req[model].data, question);
      return {
        value,
        diff: await diff(value, current, { type: req.query.type })
      };
    });
};

const getProjectEstablishment = () => (req, res, next) => {
  if (!req.project) {
    return next();
  }
  req.api(`/establishment/${req.project.establishmentId}`)
    .then(({ json: { data } }) => {
      req.project.establishment = data;
      req.project.establishment.licenceHolder = (data.roles.find(r => r.type === 'pelh' || r.type === 'nprc') || {}).profile;
    })
    .then(() => next())
    .catch(() => {
      // if project cannot be loaded then set licence holder details to a placeholder
      req.project.establishment.licenceHolder = {
        firstName: 'Unknown',
        lastName: 'User'
      };
      next();
    });
};

const getPreviousProtocols = () => (req, res, next) => {
  Promise.all([
    getFirstVersion(req),
    getPreviousVersion(req),
    getGrantedVersion(req)
  ])
    .then(([first, previous, granted]) => {
      first = get(first, 'data.protocols', []).filter(Boolean).filter(p => !p.deleted).map(p => p.id);
      previous = get(previous, 'data.protocols', []).filter(Boolean).filter(p => !p.deleted).map(p => p.id);
      granted = get(granted, 'data.protocols', []).filter(Boolean).map(p => p.id);

      const showDeleted = uniq([ ...previous, ...granted ]);

      res.locals.static.previousProtocols = { first, previous, granted, showDeleted };
    })
    .then(() => next())
    .catch(next);
};

module.exports = {
  getVersion,
  getComments,
  canComment,
  getPreviousVersion,
  getGrantedVersion,
  getAllChanges,
  getChangedValues,
  getProjectEstablishment,
  getPreviousProtocols
};
