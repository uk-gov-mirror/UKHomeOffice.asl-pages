import { connect } from 'react-redux';
import { clickLinkFilter } from '../../../../lib/actions';
import LinkFilter from '../components/link-filter';

const mapStateToProps = ({ datatable: { filters: { active, options } } }, { prop, append }) => {
  return {
    selected: active[prop] && active[prop][0],
    filters: [ ...options, ...append ]
  };
};

const mapDispatchToProps = (dispatch, { prop }) => {
  return {
    onChange: val => dispatch(clickLinkFilter(prop, val))
  };
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkFilter);
