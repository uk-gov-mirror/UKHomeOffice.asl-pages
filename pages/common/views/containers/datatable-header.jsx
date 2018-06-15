import { connect } from 'react-redux';
import { setSortColumn } from '../../../../lib/actions';
import TableHeader from '../components/datatable-header';

const mapStateToProps = ({
  datatable: { sort: { column, ascending } }
}, {
  sortable, title
}) => ({
  column,
  ascending,
  sortable,
  title
});

export default connect(
  mapStateToProps,
  { setSortColumn }
)(TableHeader);
