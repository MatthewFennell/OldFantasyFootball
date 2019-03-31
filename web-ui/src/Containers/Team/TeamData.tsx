import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import TeamData from '../../Components/Team/TeamData';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';
import { setAllCollegeTeams } from '../../Actions/AdminActions';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';
import {
	getWeekBeingViewed,
	getAverageWeeklyPoints,
	getTopWeeklyPlayer,
	getTopWeeklyUser,
} from '../../Selectors/StatsSelector';
import {
	setWeekBeingViewed,
	addToAverageWeeklyPoints,
	addToTopWeeklyPlayers,
	addToTopWeeklyUsers,
	setTotalNumberOfWeeks,
} from '../../Actions/StatsActions';

import { setTransferMarket } from '../../Actions/TransferActions';

const mapStateToProps = (state: State) => ({
	weekBeingViewed: getWeekBeingViewed(state),
	averageWeeklyPoints: getAverageWeeklyPoints(state),
	topWeeklyPlayer: getTopWeeklyPlayer(state),
	topWeeklyUsers: getTopWeeklyUser(state),
	allCollegeTeams: getAllCollegeTeams(state),
	userBeingViewed: getUserBeingViewed(state)
});

const mapDispatchToProps = {
	setWeekBeingViewed,
	addToAverageWeeklyPoints,
	addToTopWeeklyPlayers,
	addToTopWeeklyUsers,
	setTotalNumberOfWeeks,
	setTransferMarket,
	setAllCollegeTeams,
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(TeamData);
