import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Login from '../Components/Login/View';
import { setAccount } from '../Actions/AccountActions';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
  setAccount
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Login);
