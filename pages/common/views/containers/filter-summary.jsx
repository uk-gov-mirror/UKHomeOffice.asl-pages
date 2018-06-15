import { connect } from 'react-redux';
import FilterSummary from '../components/filter-summary';
import { applyFilters } from '../../../../lib/reducers/datatable';

const mapStateToProps = ({ static: { schema }, datatable: { data, filters } }) => ({
  all: data,
  filtered: applyFilters({ data, filters, schema })
});

export default connect(
  mapStateToProps
)(FilterSummary);
