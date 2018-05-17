import { connect } from 'react-redux';
import ExportLink from '../components/export-link';

const mapStateToProps = ({ filters, sort }) => ({ filters, sort });

export default connect(
  mapStateToProps
)(ExportLink);
