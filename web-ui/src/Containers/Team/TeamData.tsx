import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import TeamData from '../../Components/Team/TeamData';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';
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
} from '../../Actions/StatsActions';

import {
	getLeagueCache
} from '../../Selectors/LeagueSelector';

import { setTransferMarket } from '../../Actions/TransferActions';

const mapStateToProps = (state: State) => ({
	leagueCache: getLeagueCache(state),
	weekBeingViewed: getWeekBeingViewed(state),
	averageWeeklyPointsCache: getAverageWeeklyPointsCache(state),
	topWeeklyPlayerCache: getTopWeeklyPlayerCache(state),
	topWeeklyUsersCache: getTopWeeklyUserCache(state),
	allCollegeTeams: getAllCollegeTeams(state),
	userBeingViewed: getUserBeingViewed(state)
});

const mapDispatchToProps = {
	setWeekBeingViewed,
	addToAverageWeeklyPointsCache,
	addToTopWeeklyPlayersCache,
	addToTopWeeklyUsersCache,
	setTotalNumberOfWeeks,
	setTransferMarket,
	setAllCollegeTeams,
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(TeamData);
