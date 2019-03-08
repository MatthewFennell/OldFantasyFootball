import { connect } from 'react-redux';
import { setFirstname as setFirstName } from '../Actions/AccountActions';
import AccountBalance from '../Components/Reusable/AccountBalance';
import { State } from '../Reducers/root';
import { getFirstName } from '../Selectors/AccountSelector';

const mapStateToProps = (state: State) => ({
	firstName: getFirstName(state)
});

const mapDispatchToProps = {
	setFirstName,
	getFirstName
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(AccountBalance);
