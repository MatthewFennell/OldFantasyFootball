import { connect } from 'react-redux';
import { State } from '../../../Reducers/root';
import Goalkeeper from '../../../Components/Team/PitchLayout/Goalkeeper';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Goalkeeper);
