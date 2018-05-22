import { connect } from 'react-redux';
import FilterSummary from '../components/filter-summary';
import { applyFilters } from '../../../../lib/reducers/filters';

const mapStateToProps = ({ list: { data, schema }, filters }) => ({
  all: data,
  filtered: applyFilters({ data, filters, schema })
});

export default connect(
  mapStateToProps
)(FilterSummary);
