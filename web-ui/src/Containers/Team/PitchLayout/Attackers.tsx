import { connect } from 'react-redux';
import { State } from '../../../Reducers/root';
import Attackers from '../../../Components/Team/PitchLayout/Attackers';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Attackers);
