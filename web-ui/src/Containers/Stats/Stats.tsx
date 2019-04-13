import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import { setStatsHistory } from '../../Actions/StatsActions';
import { getStatsHistory, getTotalNumberOfWeeks } from '../../Selectors/StatsSelector';
import Stats from '../../Components/Stats/Stats';

const mapStateToProps = (state: State) => ({
	statsHistory: getStatsHistory(state),
	totalNumberOfWeeks: getTotalNumberOfWeeks(state),
});

const mapDispatchToProps = {
	setStatsHistory
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Stats);
