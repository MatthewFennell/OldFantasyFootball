import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Admin from '../../Components/Admin/Admin';
import { setAdminPageBeingViewed, setAllCollegeTeams } from '../../Actions/AdminActions';
import { getAdminPageBeingViewed, getAllCollegeTeams } from '../../Selectors/AdminSelector';

const mapStateToProps = (state: State) => ({
	adminPageBeingViewed: getAdminPageBeingViewed(state),
	allCollegeTeams: getAllCollegeTeams(state)
});

const mapDispatchToProps = {
	setAdminPageBeingViewed,
	setAllCollegeTeams
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Admin);
