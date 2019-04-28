import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Admin from '../../Components/Admin/Admin';
import { getTeamAddingPoints, getPlayersInFilteredTeam, getAdminPageBeingViewed, getAllCollegeTeams } from '../../Selectors/AdminSelector';
import { addCollegeTeam, removeCollegeTeam, setAdminPageBeingViewed, setAllCollegeTeams } from '../../Actions/AdminActions';

const mapStateToProps = (state: State) => ({
	adminPageBeingViewed: getAdminPageBeingViewed(state),
	allCollegeTeams: getAllCollegeTeams(state),
	teamAddingPoints: getTeamAddingPoints(state),
	playersInFilteredTeam: getPlayersInFilteredTeam(state)
});

const mapDispatchToProps = {
	addCollegeTeam,
	removeCollegeTeam,
	setAdminPageBeingViewed,
	setAllCollegeTeams
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Admin);
