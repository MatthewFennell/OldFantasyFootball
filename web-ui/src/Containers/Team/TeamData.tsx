import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import TeamData from '../../Components/Team/TeamData';
import { getWeeklyTeamCache, getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';
import { setAllCollegeTeams } from '../../Actions/AdminActions';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';
import {
	getWeekBeingViewed,
	getAverageWeeklyPointsCache,
	getTopWeeklyPlayerCache,
	getTopWeeklyUserCache,
} from '../../Selectors/StatsSelector';
import {
	setWeekBeingViewed,
	addToAverageWeeklyPointsCache,
	addToTopWeeklyPlayersCache,
	addToTopWeeklyUsersCache,
	setTotalNumberOfWeeks,
	setMostValuable
} from '../../Actions/StatsActions';

import {
	addToLeagueCache
} from '../../Actions/LeagueActions';

import {
	getLeagueCache
} from '../../Selectors/LeagueSelector';

import { setRemainingBudget, setTransferMarket } from '../../Actions/TransferActions';

import { setTeam, addToWeeklyTeamCache } from '../../Actions/ActiveTeamActions';

const mapStateToProps = (state: State) => ({
	leagueCache: getLeagueCache(state),
	weekBeingViewed: getWeekBeingViewed(state),
	averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
	topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
	topWeeklyUsersCache: getTopWeeklyUserCache(state),
	weeklyTeamCache: getWeeklyTeamCache(state),
	allCollegeTeams: getAllCollegeTeams(state),
	userBeingViewed: getUserBeingViewed(state)
});

const mapDispatchToProps = {
	addToLeagueCache,
	setWeekBeingViewed,
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
