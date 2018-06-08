import { connect } from 'react-redux';
import Diff from '../components/diff';

const mapStateToProps = ({ diff }) => ({ diff });

export default connect(mapStateToProps)(Diff);
