import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Settings from '../../Components/Settings/Settings';
import { getRules } from '../../Selectors/StatsSelector';
import { setRules } from '../../Actions/StatsActions';

const mapStateToProps = (state: State) => ({
	rules: getRules(state)
});

const mapDispatchToProps = {
	setRules
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Settings);
