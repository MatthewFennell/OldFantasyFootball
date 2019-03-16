import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import TeamData from '../../Components/Team/TeamData';
import { getWeeklyTeamCache } from '../../Selectors/ActiveTeamSelector';
import { setAllCollegeTeams } from '../../Actions/AdminActions';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';
import {
	getWeekBeingViewed,
	getWeeklyPointsCache,
	getAverageWeeklyPointsCache,
	getTopWeeklyPlayerCache,
	getTopWeeklyUserCache,
} from '../../Selectors/StatsSelector';
import {
	setWeekBeingViewed,
	addToWeeklyPointsCache,
	addToAverageWeeklyPointsCache,
	addToTopWeeklyPlayersCache,
	addToTopWeeklyUsersCache,
	setTotalNumberOfWeeks,
	setMostValuable
} from '../../Actions/StatsActions';

import { setRemainingBudget, setTransferMarket } from '../../Actions/TransferActions';

import { setTeam, addToWeeklyTeamCache } from '../../Actions/ActiveTeamActions';

const mapStateToProps = (state: State) => ({
	weekBeingViewed: getWeekBeingViewed(state),
	weeklyPointsCache: getWeeklyPointsCache(state),
	averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
	topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
	topWeeklyUsersCache: getTopWeeklyUserCache(state),
	weeklyTeamCache: getWeeklyTeamCache(state),
	allCollegeTeams: getAllCollegeTeams(state),
});

const mapDispatchToProps = {
	setWeekBeingViewed,
	addToWeeklyPointsCache,
	addToAverageWeeklyPointsCache,
	addToTopWeeklyPlayersCache,
	addToTopWeeklyUsersCache,
	setTeam,
	addToWeeklyTeamCache,
	setTotalNumberOfWeeks,
	setTransferMarket,
	setAllCollegeTeams,
	setRemainingBudget,
	setMostValuable
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(TeamData);
