import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Captain from '../../Components/Captain/Captain';
import { setPlayersInFilteredTeam } from '../../Actions/AdminActions';

const mapStateToProps = (state: State) => ({
});

const mapDispatchToProps = {
	setPlayersInFilteredTeam
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Captain);
