import { connect } from 'react-redux';
import { doSearch } from '../../../../lib/actions';
import Search from '../components/search';

const mapStateToProps = ({ datatable: { filters } }) => ({
  filter: filters['*'] ? filters['*'][0] : ''
});

module.exports = connect(
  mapStateToProps,
  { onChange: value => doSearch(value) }
)(Search);
