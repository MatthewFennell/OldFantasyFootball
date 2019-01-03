import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Transactions from '../Components/Transactions/View';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Transactions);
