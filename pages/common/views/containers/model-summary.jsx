import { connect } from 'react-redux';
import ModelSummary from '../components/model-summary';

const mapStateToProps = ({ model }, { formatters }) => ({
  model,
  formatters: formatters || {}
});

export default connect(mapStateToProps)(ModelSummary);
