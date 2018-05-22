import { connect } from 'react-redux';
import { uniq, flatten } from 'lodash';
import { setFilter } from '../../../../lib/actions';
import LinkFilter from '../components/link-filter';

const mapStateToProps = ({ filters , list: { data } }, { prop }) => {
  return {
    selected: filters[prop] && filters[prop][0],
    filters: uniq(flatten(data.map(row => row[prop]))).sort()
  };
};

const mapDispatchToProps = (dispatch, { prop }) => {
  return {
    onChange: val => dispatch(setFilter(prop, val))
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkFilter);
