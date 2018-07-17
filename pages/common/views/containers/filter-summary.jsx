import { connect } from 'react-redux';
import FilterSummary from '../components/filter-summary';

const mapStateToProps = ({
  datatable: {
    pagination: {
      count: filtered,
      totalCount: total
    }
  }
}) => ({
  total,
  filtered
});

export default connect(
  mapStateToProps
)(FilterSummary);
