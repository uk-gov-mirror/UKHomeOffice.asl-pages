import { merge, pickBy, get } from 'lodash';
import { connect } from 'react-redux';
import { applyFilters, getSortedData } from '../../../../lib/reducers/datatable';
import DataTable from '../components/datatable';

const mapStateToProps = ({
  static: { schema },
  datatable: { data, filters, sort }
}, {
  formatters
}) => {
  const existsInData = (key, accessor) => {
    accessor = accessor || key;
    return !!data.find(row => get(row, accessor));
  };
  return {
    data: getSortedData({
      data: applyFilters({ data, filters, schema }),
      schema,
      sort
    }),
    schema: pickBy(merge({}, schema, formatters), (item, key) => item.show && existsInData(key, item.accessor)),
    sort
  };
};

export default connect(
  mapStateToProps
)(DataTable);
