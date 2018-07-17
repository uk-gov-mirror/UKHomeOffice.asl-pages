import { connect } from 'react-redux';
import { doSort } from '../../../../lib/actions';
import TableHeader from '../components/datatable-header';

const mapStateToProps = ({
  datatable: {
    sort: { column, ascending },
    data: { isFetching }
  }
}, {
  sortable
}) => ({
  disabled: isFetching,
  column,
  ascending,
  sortable
});

const mapDispatchToProps = dispatch => ({
  onHeaderClick: id => dispatch(doSort(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableHeader);
