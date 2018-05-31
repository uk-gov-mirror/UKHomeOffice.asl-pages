import { merge, pickBy } from 'lodash';
import { connect } from 'react-redux';
import { setSort } from '../../../../lib/actions';
import { applyFilters } from '../../../../lib/reducers/filters';
import { getSortedData } from '../../../../lib/reducers/sort';
import DataTable from '../components/datatable';

const mapStateToProps = ({
  list: {
    data,
    schema
  },
  filters,
  sort,
  url
}, {
  formatters
}) => ({
  data: getSortedData({
    data: applyFilters({ data, filters, schema }),
    schema,
    sort
  }),
  schema: pickBy(merge({}, schema, formatters), item => item.show),
  sort,
  url
});

export default connect(
  mapStateToProps,
  { setSort }
)(DataTable);
