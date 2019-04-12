import start from '@asl/projects';

const state = window.INITIAL_STATE;

start({
  basename: state.static.basename
}, {
  project: {
    ...state.model.data,
    id: state.model.id
  },
  settings: {
    establishments: state.static.establishments.map(e => e.name)
  },
  application: {
    readonly: true,
    schemaVersion: state.model.project.schemaVersion,
    establishment: state.static.establishment.name
  }
});
