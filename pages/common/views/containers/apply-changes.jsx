import { connect } from 'react-redux';
import ApplyChanges from '../components/apply-changes';

const mapStateToProps = ({
  datatable: { filters: { active: filters }, sort, pagination: { page } }
}, {
  query = {}
}) => ({
  query: Object.assign({}, { filters, sort, page: page + 1 }, query)
});

export default connect(mapStateToProps)(ApplyChanges);
