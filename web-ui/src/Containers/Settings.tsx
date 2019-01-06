import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import Settings from '../Components/Settings/Settings';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Settings);
