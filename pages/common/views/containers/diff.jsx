import { reduce } from 'lodash';
import { connect } from 'react-redux';
import Diff from '../components/diff';

const mapStateToProps = ({ model, static: { values, schema } }) => {
  return {
    diff: reduce(schema, (all, value, key) => {
      return { ...all,
        [key]: {
          oldValue: model[key],
          newValue: values[key]
        }};
    }, {})
  };
};

export default connect(mapStateToProps)(Diff);
