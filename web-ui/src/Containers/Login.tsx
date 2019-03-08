import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Login from '../Components/Login/View';
import { setAccount } from '../Actions/AccountActions';
import { setRemainingBudget } from '../Actions/TransferActions';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
	setAccount,
	setRemainingBudget
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Login);
