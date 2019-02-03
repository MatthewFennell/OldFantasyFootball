import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import AddPointsForm from '../../Components/Admin/AddPoints/AddPointsForm';
import { getTeamAddingPoints } from '../../Selectors/AdminSelector';
import { setTeamAddingPoints } from '../../Actions/AdminActions';

const mapStateToProps = (state: State) => ({
  teamAddingPoints: getTeamAddingPoints(state)
});

const mapDispatchToProps = {
  setTeamAddingPoints
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(AddPointsForm);