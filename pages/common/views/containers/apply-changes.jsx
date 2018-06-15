import { connect } from 'react-redux';
import ApplyChanges from '../components/apply-changes';

const mapStateToProps = ({
  datatable: { filters, sort }
}, {
  filters: newFilters,
  sort: newSort
}) => ({
  filters: newFilters || filters,
  sort: newSort || sort
});

export default connect(mapStateToProps)(ApplyChanges);
