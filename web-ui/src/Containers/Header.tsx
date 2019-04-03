import { connect } from 'react-redux';
import { State, logout } from '../Reducers/root';
import Header from '../Components/Reusable/Header/Header';
import { setAccount, setPageBeingViewed } from '../Actions/AccountActions';
import {
	getSurname,
	getFirstName,
	getPageBeingViewed,
	getRoles,
	getAccountId
} from '../Selectors/AccountSelector';
import { setUserBeingViewed } from '../Actions/ActiveTeamActions';

const mapStateToProps = (state: State) => ({
	firstname: getFirstName(state),
	surname: getSurname(state),
	pageBeingViewed: getPageBeingViewed(state),
	roles: getRoles(state),
	accountId: getAccountId(state)
});

const mapDispatchToProps = {
	setAccount,
	setPageBeingViewed,
	setUserBeingViewed,
	logout
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Header);
