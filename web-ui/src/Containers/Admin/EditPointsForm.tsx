import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import EditPointsForm from '../../Components/Admin/EditPointsForm';
import { getPlayersInFilteredTeam } from '../../Selectors/AdminSelector';
import { setTeamAddingPoints } from '../../Actions/AdminActions';

const mapStateToProps = (state: State) => ({
	playersInFilteredTeam: getPlayersInFilteredTeam(state)
});

const mapDispatchToProps = {
	setTeamAddingPoints
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(EditPointsForm);
