import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import CategoryTemplate from '../Components/CategoryTemplate';
import { getPageBeingViewed } from '../Selectors/AccountSelector';

const mapStateToProps = (state: State) => ({ pageBeingViewed: getPageBeingViewed(state) });

export default connect<any, any, any>(mapStateToProps as any)(CategoryTemplate);
