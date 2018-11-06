import { connect } from 'react-redux';
import ModelSummary from '../components/model-summary';

const mapStateToProps = ({ model, static: { schema } }, { formatters, schema: ownSchema }) => ({
  model,
  formatters,
  schema: ownSchema || schema
});

export default connect(mapStateToProps)(ModelSummary);
