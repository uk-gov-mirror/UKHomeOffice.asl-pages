import { connect } from 'react-redux';
import Link from '../components/link';

const mapStateToProps = ({ static: { url, urls, establishment } }, props) => {
  establishment = props.establishment || (establishment || {}).id;
  return { url, urls, establishment };
};

export default connect(mapStateToProps)(Link);
