import { connect } from 'react-redux';
import Pil from '../components/pil';

const mapStateToProps = ({ static: { pil, profile } }) => ({ pil, profile });

export default connect(mapStateToProps)(Pil);
