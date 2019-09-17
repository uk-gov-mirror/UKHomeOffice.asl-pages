import start from '@asl/projects';

const state = window.INITIAL_STATE;

start({
  project: {
    ...state.model.data,
    id: state.model.id
  },
  comments: state.static.comments,
  changes: {
    latest: (state.static.changes && state.static.changes.latest) || [],
    granted: (state.static.changes && state.static.changes.granted) || []
  },
  application: {
    readonly: true,
    commentable: state.static.commentable,
    showComments: state.static.showComments,
    user: `${state.static.user.firstName} ${state.static.user.lastName}`,
    basename: state.static.basename,
    schemaVersion: state.model.project.schemaVersion,
    project: state.static.project,
    establishment: state.static.establishment,
    showConditions: state.static.showConditions,
    editConditions: state.static.editConditions,
    isGranted: state.static.isGranted
  },
  static: { urls: state.static.urls }
});
