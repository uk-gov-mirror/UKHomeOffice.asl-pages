import { connect } from 'react-redux';
import Snippet from '../components/snippet';

const mapStateToProps = ({ static: { content } }) => ({ content });

export default connect(mapStateToProps)(Snippet);
