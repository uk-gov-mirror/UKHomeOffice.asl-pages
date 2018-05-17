import { connect } from 'react-redux';
import StatusBar from '../components/status-bar';

const mapStateToProps = state => {
  return { name: state.user.name }
};

export default connect(
  mapStateToProps
)(StatusBar);
