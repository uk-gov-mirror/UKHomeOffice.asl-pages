import { connect } from 'react-redux';
import ModelSummary from '../components/model-summary';

const mapStateToProps = ({ static: { values: model } }) => ({ model });

export default connect(mapStateToProps)(ModelSummary);
