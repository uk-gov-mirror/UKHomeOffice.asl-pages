import start from '@asl/projects';

const state = window.INITIAL_STATE;

start({
  basename: state.static.basename
}, {
  project: {
    ...state.model.data,
    id: state.model.id
  },
  comments: state.static.comments,
  settings: {
    establishments: state.static.establishments.map(e => e.name)
  },
  application: {
    readonly: true,
    commentable: state.static.commentable,
    showComments: state.static.showComments,
    user: `${state.static.user.firstName} ${state.static.user.lastName}`,
    basename: state.static.basename,
    schemaVersion: state.model.project.schemaVersion,
    establishment: state.static.establishment.name,
    changed: state.static.changed
  }
});
