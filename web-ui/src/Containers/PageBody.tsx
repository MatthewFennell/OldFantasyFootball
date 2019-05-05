import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import PageBody from '../Components/Reusable/PageBody';
import { getPageBeingViewed } from '../Selectors/AccountSelector';

const mapStateToProps = (state: State) => ({ pageBeingViewed: getPageBeingViewed(state) });

export default connect<any, any, any>(mapStateToProps as any)(PageBody);
