import { connect } from 'react-redux';
import { setSortColumn } from '../../../../lib/actions';
import TableHeader from '../components/datatable-header';

const mapStateToProps = ({
  datatable: { sort: { column, ascending } }
}, {
  sortable
}) => ({
  column,
  ascending,
  sortable
});

export default connect(
  mapStateToProps,
  { setSortColumn }
)(TableHeader);
