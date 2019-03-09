import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Player from '../Components/Team/PitchLayout/Player';
import { getActiveTeam } from '../Selectors/ActiveTeamSelector';
import { setTeam, removeIndex } from '../Actions/ActiveTeamActions';
import {
	setRemainingBudget,
	addToPlayerBeingRemoved,
	removeFromPlayersBeingAdded
} from '../Actions/TransferActions';
import { getRemainingBudget, getPlayersBeingAdded } from '../Selectors/TransfersSelector';

const mapStateToProps = (state: State) => ({
	activeTeam: getActiveTeam(state),
	remainingBudget: getRemainingBudget(state),
	playersBeingAdded: getPlayersBeingAdded(state)
});

const mapDispatchToProps = {
	setTeam,
	removeIndex,
	setRemainingBudget,
	addToPlayerBeingRemoved,
	removeFromPlayersBeingAdded
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Player);
