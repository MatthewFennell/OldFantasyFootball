import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Transfers from '../Components/Transfers/Transfers';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transfers);