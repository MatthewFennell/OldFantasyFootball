import { connect } from 'react-redux';
import { State } from '../../../Reducers/root';
import Pitch from '../../../Components/Team/PitchLayout/Pitch';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Pitch);
