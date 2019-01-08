import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Stats from '../../Components/Team/Stats';
import { getAveragePoints } from '../../Selectors/StatsSelector';
import { setAveragePoints } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
  averagePoints: getAveragePoints(state)
});

const mapDispatchToProps = {
  setAveragePoints
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Stats);
