import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Info from '../../Components/Team/Info';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Info);
