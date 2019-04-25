const { chain, get } = require('lodash');

const getVersion = () => (req, res, next) => {
  req.api(`/establishments/${req.establishmentId}/projects/${req.projectId}/project-versions/${req.versionId}`)
    .then(({ json: { data } }) => {
      req.version = data;
    })
    .then(() => next())
    .catch(next);
};

const isNew = (user, activityLog, createdAt) => {
  const activity = user.profile.asruUser ? /returned-to-applicant$/ : /resubmitted$/;
  const logItem = activityLog.find(e => e.eventName.match(activity));
  return !logItem || createdAt > logItem.createdAt;
};

const getComments = () => (req, res, next) => {
  if (!req.project.openTasks.length) {
    return next();
  }
  req.api(`/tasks/${req.project.openTasks[0].id}`)
    .then(({ json: { data } }) => {
      const status = req.user.profile.asruUser ? 'returned-to-applicant' : 'resubmitted';
      const statuses = data.activityLog.filter(e => e.eventName.match(/^status:/));
      // if most recent status change is returned to applicant (asru user) or
      // resubmitted (non-asru), ignore comments made after this status change.
      const ignoreAfter = statuses[0] && statuses[0].event.status === status && statuses[0].createdAt;
      const comments = chain(data.activityLog)
        .filter(e => e.eventName === 'comment')
        .filter(e => !ignoreAfter || e.createdAt < ignoreAfter)
        .groupBy(comment => comment.event.meta.payload.meta.field)
        .mapValues(comments => {
          return comments.map(({ comment, createdAt, changedBy: { firstName, lastName } }) => {
            return {
              comment,
              // we want to show the date of the following status change, not the comment submission.
              createdAt: ([...statuses].reverse().find(s => s.createdAt > createdAt) || {}).createdAt,
              author: `${firstName} ${lastName}`,
              isNew: isNew(req.user, data.activityLog, createdAt)
            };
          })
          .reverse()    
        })
        .value();

      res.locals.static.comments = comments;
    })
    .then(() => next())
    .catch(next);
};

const getStatus = (req, taskId) => Promise.resolve()
  .then(() => req.api(`/tasks/${taskId}`))
  .then(({ json: { data } }) => {
    return data.activityLog
      .filter(log => log.eventName.match(/^status:/))
      .map(log => log.event.status);
  });

const withAsru = (req, taskId) => {
  return getStatus(req, taskId)
    .then(statuses => {
      return statuses.reduceRight((wAsru, status) => {
        if (status === 'resubmitted') {
          return true;
        } else if (status === 'returned-to-applicant') {
          return false;
        }
        return wAsru;
      }, true);
    });
};

const hasEditPermission = (req) => {
  if (req.user.profile.asruUser) {
    return Promise.resolve();
  }
  const params = {
    id: req.projectId,
    licenceHolderId: req.project.licenceHolderId,
    establishment: req.establishment.id
  };

  return req.user.can('project.update', params);
};

const userCanComment = req => {
  const asruUser = req.user.profile.asruUser;
  const taskId = get(req.project, 'openTasks[0].id');

  if (!taskId) {
    return Promise.resolve(false);
  }

  return Promise.resolve()
    .then(() => {
      return withAsru(req, taskId);
    })
    .then((isWithAsru) => {
      return asruUser ? isWithAsru : !isWithAsru && hasEditPermission(req);
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

module.exports = {
  getVersion,
  getComments,
  canComment
};
