import { pick } from 'lodash';
import { connect } from 'react-redux';
import ModelSummary from '../components/model-summary';

const mapStateToProps = ({ model, static: { schema } }, { formatters }) => ({
  model: pick(model, Object.keys(schema)),
  formatters: formatters || {}
});

export default connect(mapStateToProps)(ModelSummary);
