import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import TransfersTableBody from '../../Components/Transfers/TransfersTableBody';
import { getFilteredPlayers } from '../../Selectors/TransfersSelector';
import { reverseFilteredPlayers, setFilteredPlayers } from '../../Actions/TransferActions';

const mapStateToProps = (state: State) => ({
  filteredPlayers: getFilteredPlayers(state)
});

const mapDispatchToProps = {
  setFilteredPlayers,
  reverseFilteredPlayers
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(TransfersTableBody);
