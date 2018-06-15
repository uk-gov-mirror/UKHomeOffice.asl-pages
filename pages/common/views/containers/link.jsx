import { connect } from 'react-redux';
import Link from '../components/link';

const mapStateToProps = ({ static: { url } }) => ({ url });

export default connect(mapStateToProps)(Link);
