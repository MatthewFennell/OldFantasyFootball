import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Info from '../../Components/Team/Info';
import {
	getWeekBeingViewed,
	getTotalNumberOfWeeks,
	getTotalPoints,
	getWeeklyPoints
} from '../../Selectors/StatsSelector';
import { getUserBeingViewed } from '../../Selectors/ActiveTeamSelector';

import { setTeam } from '../../Actions/ActiveTeamActions';

import { setWeekBeingViewed, setTotalPoints, setWeeklyPoints } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
	weekBeingViewed: getWeekBeingViewed(state),
	totalNumberOfWeeks: getTotalNumberOfWeeks(state),
	totalPoints: getTotalPoints(state),
	userBeingViewed: getUserBeingViewed(state),
	weeklyPoints: getWeeklyPoints(state)
});

const mapDispatchToProps = {
	setWeekBeingViewed,
	setTeam,
	setTotalPoints,
	setWeeklyPoints
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Info);
