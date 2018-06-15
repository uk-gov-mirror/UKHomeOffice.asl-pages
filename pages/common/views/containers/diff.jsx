import { connect } from 'react-redux';
import Diff from '../components/diff';

const mapStateToProps = ({ static: { diff } }) => ({ diff });

export default connect(mapStateToProps)(Diff);
