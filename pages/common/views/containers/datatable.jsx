import { merge, pickBy, get } from 'lodash';
import { connect } from 'react-redux';
import { getValue } from '../../../../lib/utils';
import DataTable from '../components/datatable';

const mapStateToProps = ({
  static: { schema },
  datatable: { data: { rows }, filters, sort }
}, {
  formatters
}) => {
  return {
    sort,
    data: rows,
    schema: pickBy(merge({}, schema, formatters), (item, key) => item.show)
  };
};

export default connect(
  mapStateToProps
)(DataTable);
