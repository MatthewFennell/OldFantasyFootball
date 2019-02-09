import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import CreatePlayerForm from '../../Components/Admin/CreatePlayer/CreatePlayerForm';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';

const mapStateToProps = (state: State) => ({
  allCollegeTeams: getAllCollegeTeams(state)
});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(CreatePlayerForm);
