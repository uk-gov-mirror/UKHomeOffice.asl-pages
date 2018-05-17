import { connect } from 'react-redux';
import TextFilter, { setFilters } from '@ukhomeoffice/asl-components/components/filters';

const mapStateToProps = ({ filters }) => ({ filters });

const mapDispatchToProps = dispatch => ({
  onChange: filters => dispatch(setFilters(filters))
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextFilter);
