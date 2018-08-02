import { merge, pickBy } from 'lodash';
import { connect } from 'react-redux';
import DataTable from '../components/datatable';

const mapStateToProps = ({
  static: { schema },
  datatable: { data: { rows, isFetching }, filters, sort }
}, {
  formatters
}) => {
  return {
    sort,
    data: rows,
    isFetching,
    schema: pickBy(merge({}, schema, formatters), (item, key) => item.show)
  };
};

export default connect(
  mapStateToProps
)(DataTable);
