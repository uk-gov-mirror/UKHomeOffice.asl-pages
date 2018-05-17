import { pickBy, merge } from 'lodash';
import { connect } from 'react-redux';
import Filters, { setFilters } from '@ukhomeoffice/asl-components/components/filters';

const mapStateToProps = ({ filters, list: { schema, data } }, { formatters }) => ({
  schema: pickBy(merge({}, schema, formatters), item => item.filter),
  filters,
  data
});

const mapDispatchToProps = dispatch => ({
  onChange: filters => dispatch(setFilters(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
