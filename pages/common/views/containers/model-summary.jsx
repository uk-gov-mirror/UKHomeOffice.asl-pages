import { map } from 'lodash';
import { connect } from 'react-redux';
import ModelSummary from '../components/model-summary';

const mapStateToProps = ({ static: { schema, values } }) => ({
  model: values,
  schema
});

export default connect(mapStateToProps)(ModelSummary);
