import { connect } from 'react-redux';
import StatusBar from '../components/status-bar';

const mapStateToProps = state => ({
  name: state.user
});

export default connect(
  mapStateToProps
)(StatusBar);
