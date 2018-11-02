import { connect } from 'react-redux';
import TaskList from '../components/tasklist';

const mapStateToProps = ({ static: { tasks } }) => ({ tasks });

export default connect(mapStateToProps)(TaskList);
