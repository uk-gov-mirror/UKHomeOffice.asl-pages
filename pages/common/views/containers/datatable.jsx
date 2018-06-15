import { merge, pickBy } from 'lodash';
import { connect } from 'react-redux';
import { applyFilters, getSortedData } from '../../../../lib/reducers/datatable';
import DataTable from '../components/datatable';

const mapStateToProps = ({
  static: { schema },
  datatable: { data, filters, sort }
}, {
  formatters
}) => {
  return {
    data: getSortedData({
      data: applyFilters({ data, filters, schema }),
      schema,
      sort
    }),
    schema: pickBy(merge({}, schema, formatters), item => item.show),
    sort
  };
};

export default connect(
  mapStateToProps
)(DataTable);
