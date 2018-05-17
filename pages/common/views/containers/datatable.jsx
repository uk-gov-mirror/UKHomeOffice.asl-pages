import { merge, pickBy } from 'lodash';
import { connect } from 'react-redux';
import DataTable, { setSort } from '@ukhomeoffice/asl-components/components/datatable';
import { applyFilters } from '@ukhomeoffice/asl-components/components/filters';

const mapStateToProps = ({ list: { data, schema }, filters, sort }, { formatters }) => ({
  data: applyFilters({ data, filters, schema }),
  schema: pickBy(merge({}, schema, formatters), item => item.show),
  sort
});

const mapDispatchToProps = dispatch => ({
  onChange: sort => dispatch(setSort(sort))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataTable);
