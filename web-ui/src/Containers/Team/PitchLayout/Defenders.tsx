import { connect } from 'react-redux';
import { State } from '../../../Reducers/root';
import Defenders from '../../../Components/Team/PitchLayout/Defenders';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Defenders);
