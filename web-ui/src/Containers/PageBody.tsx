import { connect } from 'react-redux';
import { State } from '../Reducers/root';
import PageBody from '../Components/Reusable/PageBody';

const mapStateToProps = (state: State) => ({});

export default connect<any, any, any>(mapStateToProps as any)(PageBody);
