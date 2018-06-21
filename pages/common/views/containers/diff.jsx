import { reduce } from 'lodash';
import { connect } from 'react-redux';
import Diff from '../components/diff';

const mapStateToProps = ({ model, static: { values } }) => ({
  diff: reduce(values, (all, value, key) => {
    return { ...all,
      [key]: {
        oldValue: model[key],
        newValue: value
      }};
  }, {})
});

export default connect(mapStateToProps)(Diff);
