import { pick } from 'lodash';
import { connect } from 'react-redux';
import Link from '../components/link';

const mapStateToProps = (state, props) => {
  return Object.assign({},
    pick(state.static,
      'url',
      'urls',
      'establishmentId',
      'profileId',
      'pilId',
      'projectId',
      'placeId'
    ), props);
};

export default connect(mapStateToProps)(Link);
