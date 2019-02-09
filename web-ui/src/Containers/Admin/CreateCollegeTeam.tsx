import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import CreateCollegeTeam from '../../Components/Admin/CreateCollegeTeam/CreateCollegeTeam';
import { addCollegeTeam } from '../../Actions/AdminActions';

const mapStateToProps = (state: State) => ({});

const mapDispatchToProps = {
  addCollegeTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(CreateCollegeTeam);
