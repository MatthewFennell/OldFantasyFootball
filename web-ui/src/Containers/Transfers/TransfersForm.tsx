import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import TransfersForm from '../../Components/Transfers/TransfersForm';
import { setFilteredPlayers } from '../../Actions/TransferActions';
import { getFilteredPlayers } from '../../Selectors/TransfersSelector';

const mapStateToProps = (state: State) => ({
  filteredPlayers: getFilteredPlayers(state)
});

const mapDispatchToProps = {
  setFilteredPlayers
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(TransfersForm);
