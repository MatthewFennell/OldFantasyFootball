import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Info from '../../Components/Team/Info';
import { getTotalPoints } from '../../Selectors/StatsSelector';
import { setTotalPoints } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
  totalPoints: getTotalPoints(state)
});

const mapDispatchToProps = {
  setTotalPoints
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Info);
