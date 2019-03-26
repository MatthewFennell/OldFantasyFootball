import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Register from '../Components/Register/View';
import { setAccount, resetAccount } from '../Actions/AccountActions';
import { setRemainingBudget } from '../Actions/TransferActions';
import { setUserBeingViewed } from '../Actions/ActiveTeamActions';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
	resetAccount,
	setAccount,
	setRemainingBudget,
	setUserBeingViewed
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Register);
