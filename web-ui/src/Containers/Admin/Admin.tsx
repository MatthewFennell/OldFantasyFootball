import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Admin from '../../Components/Admin/Admin';
import { getTeamAddingPoints, getPlayersInFilteredTeam, getAdminPageBeingViewed, getAllCollegeTeams } from '../../Selectors/AdminSelector';
import { addCollegeTeam, removeCollegeTeam, setAdminPageBeingViewed, setAllCollegeTeams, setTeamAddingPoints } from '../../Actions/AdminActions';
import { setPageBeingViewed } from '../../Actions/AccountActions';

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
	setAllCollegeTeams,
	setTeamAddingPoints,
	setPageBeingViewed
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Admin);
