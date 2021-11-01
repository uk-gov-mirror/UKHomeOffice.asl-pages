import start from '@asl/projects';
import cloneDeep from 'lodash/cloneDeep';

const state = window.INITIAL_STATE;

start({
  project: {
    ...state.model.data,
    id: state.model.id
  },
  savedProject: cloneDeep({
    ...state.model.data,
    id: state.model.id
  }),
  comments: state.static.comments,
  changes: {
    first: (state.static.changes && state.static.changes.first) || [],
    latest: (state.static.changes && state.static.changes.latest) || [],
    granted: (state.static.changes && state.static.changes.granted) || []
  },
  application: {
    commentable: state.static.commentable,
    establishment: state.static.establishment,
    showComments: state.static.showComments,
    readonly: state.static.readonly,
    user: `${state.static.user.firstName} ${state.static.user.lastName}`,
    basename: state.static.basename,
    projectUrl: state.static.projectUrl,
    project: state.static.project,
    grantedVersion: state.static.grantedVersion,
    newApplication: state.static.newApplication,
    sidebarLinks: state.static.sidebarLinks,
    canSubmit: state.static.canSubmit,
    schemaVersion: 'RA',
    licenceHolder: state.static.project.licenceHolder
  },
  static: {
    urls: state.static.urls,
    content: state.static.content
  }
});
