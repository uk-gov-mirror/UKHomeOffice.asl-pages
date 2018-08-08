import { connect } from 'react-redux';
import Notifications from '../components/notifications';

const mapStateToProps = ({ static: { notifications } }) => {
  return { notifications };
};

export default connect(mapStateToProps)(Notifications);
