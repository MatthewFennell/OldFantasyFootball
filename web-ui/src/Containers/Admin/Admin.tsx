import { connect } from 'react-redux';
import { State } from '../../Reducers/root';
import Admin from '../../Components/Admin/Admin';
import { setAdminPageBeingViewed } from '../../Actions/AdminActions';
import { getAdminPageBeingViewed } from '../../Selectors/AdminSelector';

const mapStateToProps = (state: State) => ({
  adminPageBeingViewed: getAdminPageBeingViewed(state)
});

const mapDispatchToProps = {
  setAdminPageBeingViewed
};

export default connect<any, any, any>(
  mapStateToProps as any,
  mapDispatchToProps
)(Admin);
