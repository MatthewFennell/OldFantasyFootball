import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Login from '../Components/Login/View';
import { setAccount } from '../Actions/AccountActions';
import { setUserBeingViewed, setTeam } from '../Actions/ActiveTeamActions';
import { setMostValuable } from '../Actions/StatsActions';
import { setOriginalTransferTeam } from '../Actions/TransferActions';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
	setAccount,
	setUserBeingViewed,
	setTeam,
	setMostValuable,
	setOriginalTransferTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Login);
