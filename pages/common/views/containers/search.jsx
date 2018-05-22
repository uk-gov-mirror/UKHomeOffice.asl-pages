import { connect } from 'react-redux';
import { setFilter } from '../../../../lib/actions';
import Search from '../components/search';

const mapStateToProps = ({ filters }) => ({
  filter: filters['*'] ? filters['*'][0] : ''
});

module.exports = connect(
  mapStateToProps,
  { setFilter }
)(Search);
