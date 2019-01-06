import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Leagues from '../Components/Leagues/Leagues';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Leagues);
