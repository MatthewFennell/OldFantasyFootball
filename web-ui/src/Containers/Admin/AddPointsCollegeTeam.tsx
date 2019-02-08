import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import CollegeTeam from '../../Components/Admin/AddPoints/CollegeTeam';
import { getTeamAddingPoints, getAllCollegeTeams } from '../../Selectors/AdminSelector';
import { setTeamAddingPoints, setPlayersInFilteredTeam } from '../../Actions/AdminActions';

const mapStateToProps = (state: State) => ({
  teamAddingPoints: getTeamAddingPoints(state),
  allCollegeTeams: getAllCollegeTeams(state)
});

const mapDispatchToProps = {
  setTeamAddingPoints,
  setPlayersInFilteredTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(CollegeTeam);
