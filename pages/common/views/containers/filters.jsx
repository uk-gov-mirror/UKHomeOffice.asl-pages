import { pickBy, merge, uniq, flatten, reduce } from 'lodash';
import { connect } from 'react-redux';
import Filters from '../components/filters';
import { setFilters } from '../../../../lib/actions';

const uniqueByType = (key, data, { title, formatFilterItems, format }) => ({
  key,
  title,
  format: formatFilterItems || format,
  values: uniq(flatten(data.map(row => row[key])))
});

const mapStateToProps = ({ static: { schema }, datatable: { filters, data } }, { formatters }) => {
  const mergedSchema = pickBy(merge({}, schema, formatters), item => item.filter);
  return {
    filterSettings: reduce(mergedSchema, (obj, value, key) => ({ ...obj, [key]: uniqueByType(key, data, value) }), {}),
    filters,
    data
  };
};

export default connect(
  mapStateToProps,
  { setFilters }
)(Filters);
