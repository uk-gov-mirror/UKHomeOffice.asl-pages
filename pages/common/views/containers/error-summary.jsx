import { connect } from 'react-redux';
import ErrorSummary from '../components/error-summary';

const mapStateToProps = ({ static: { errors } }) => ({ errors });

export default connect(mapStateToProps)(ErrorSummary);
