import { connect } from 'react-redux';
import { State } from '../../../Reducers/root';
import Midfielders from '../../../Components/Team/PitchLayout/Midfielders';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Midfielders);
