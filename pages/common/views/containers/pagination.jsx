import { connect } from 'react-redux';
import { changePage } from '../../../../lib/actions';
import Pagination from '../components/pagination';

const mapStateToProps = ({ datatable: { pagination } }) => ({
  ...pagination
});

const mapDispatchToProps = dispatch => ({
  onPageChange: page => {
    console.log('changing page', page)
    dispatch(changePage(page))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
