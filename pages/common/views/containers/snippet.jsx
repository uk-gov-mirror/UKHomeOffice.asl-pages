import { connect } from 'react-redux';
import Snippet from '../components/snippet';

const mapStateToProps = ({ content }) => ({ content });

export default connect(mapStateToProps)(Snippet);
