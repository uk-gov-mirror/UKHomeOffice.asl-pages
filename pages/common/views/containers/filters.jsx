import { connect } from 'react-redux';
import Filters from '../components/filters';
import { changeFilters } from '../../../../lib/actions';

const mapStateToProps = ({ datatable: { filters: { options, active } } }, { formatters }) => {
  return {
    active,
    options: options.reduce((obj, { key, values }) => {
      return {
        ...obj,
        [key]: {
          values,
          format: formatters[key] && formatters[key].format
        }
      };
    }, {})
  };
};

const mapDispatchToProps = dispatch => ({
  onFiltersChange: filters => dispatch(changeFilters(filters))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
