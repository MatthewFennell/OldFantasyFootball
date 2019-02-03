import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import CreatePlayerForm from '../../Components/Admin/CreatePlayer/CreatePlayerForm';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(CreatePlayerForm);
