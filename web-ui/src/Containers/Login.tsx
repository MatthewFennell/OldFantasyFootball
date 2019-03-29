import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Login from '../Components/Login/View';
import { setAccount } from '../Actions/AccountActions';
import { setRemainingBudget } from '../Actions/TransferActions';
import { setUserBeingViewed } from '../Actions/ActiveTeamActions';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
	setAccount,
	setRemainingBudget,
	setUserBeingViewed
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Login);
