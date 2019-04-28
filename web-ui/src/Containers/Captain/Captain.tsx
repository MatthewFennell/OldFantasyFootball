import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Captain from '../../Components/Captain/Captain';
import { setPlayersInFilteredTeam, setCaptainPageBeingViewed } from '../../Actions/AdminActions';
import { getCaptainPageBeingViewed, getPlayersInFilteredTeam } from '../../Selectors/AdminSelector';

const mapStateToProps = (state: State) => ({
	captainPageBeingViewed: getCaptainPageBeingViewed(state),
	playersInFilteredTeam: getPlayersInFilteredTeam(state)
});

const mapDispatchToProps = {
	setCaptainPageBeingViewed,
	setPlayersInFilteredTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Captain);
