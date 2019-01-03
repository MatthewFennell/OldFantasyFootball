import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import ButtonMonth from '../Components/Reusable/Header/ButtonMonth';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(ButtonMonth);
