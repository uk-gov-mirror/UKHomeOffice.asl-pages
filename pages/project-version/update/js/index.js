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
    readonly: state.model.status !== 'draft' || !state.static.canUpdate,
    user: `${state.static.user.firstName} ${state.static.user.lastName}`,
    basename: state.static.basename,
    projectUrl: state.static.projectUrl,
    project: state.static.project,
    schemaVersion: state.model.project.schemaVersion,
    newApplication: state.static.newApplication,
    previousProtocols: state.static.previousProtocols,
    previousAA: state.static.previousAA,
    canTransfer: state.static.canTransfer,
    canUpdateTraining: state.static.canUpdateTraining,
    canSubmit: state.static.canSubmit,
    canTransferDraft: state.static.canTransferDraft,
    transferInProgress: state.static.transferInProgress,
    establishments: state.static.user.asruUser
      ? state.model.licenceHolder.establishments
      : state.static.user.establishments.map(e => ({ id: e.id, name: e.name })),
    showConditions: state.static.showConditions,
    editConditions: state.static.editConditions,
    raCompulsory: state.model.raCompulsory,
    training: state.static.training,
    licenceHolder: state.model.licenceHolder
  },
  static: {
    urls: state.static.urls,
    imageRoot: '/attachment',
    content: state.static.content
  }
});
