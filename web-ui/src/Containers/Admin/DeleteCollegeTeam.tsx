import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import DeleteCollegeTeam from '../../Components/Admin/DeleteCollegeTeam/DeleteCollegeTeam';
import { getAllCollegeTeams } from '../../Selectors/AdminSelector';

import { removeCollegeTeam } from '../../Actions/AdminActions';

const mapStateToProps = (state: State) => ({
	allCollegeTeams: getAllCollegeTeams(state)
});

const mapDispatchToProps = {
	removeCollegeTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(DeleteCollegeTeam);
