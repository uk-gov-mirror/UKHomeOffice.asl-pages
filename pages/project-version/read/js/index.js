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
  changes: state.static.isGranted
    ? {}
    : {
      first: (state.static.changes && state.static.changes.first) || [],
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
    projectUrl: state.static.projectUrl,
    establishment: state.static.establishment,
    showConditions: state.static.showConditions,
    editConditions: state.static.editConditions,
    isGranted: state.static.isGranted,
    legacyGranted: state.static.legacyGranted,
    previousProtocols: state.static.previousProtocols,
    establishments: state.static.establishments || [],
    raCompulsory: state.model.raCompulsory,
    licenceHolder: state.model.licenceHolder
  },
  static: { urls: state.static.urls }
});
