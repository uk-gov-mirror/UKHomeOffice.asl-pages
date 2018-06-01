import { connect } from 'react-redux';
import Controls from '../components/controls';

const mapStateToProps = ({ url }) => ({ url });

export default connect(mapStateToProps)(Controls);
