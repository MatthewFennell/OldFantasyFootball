import * as React from 'react';
import '../../Style/Admin/Admin.css';
import CreatePlayerForm from '../../Containers/Admin/CreatePlayerForm';
import AddPointsForm from '../../Containers/Admin/AddPointsForm';
import EditPointsForm from '../../Containers/Admin/EditPointsForm';

interface AdminProps {
  setAdminPageBeingViewed: (adminPageBeingViewed: string) => void;
  adminPageBeingViewed: string;
}

class Admin extends React.Component<AdminProps, {}> {
  constructor(props: AdminProps) {
    super(props);
    this._setPageBeingViewed = this._setPageBeingViewed.bind(this);
  }

  _setPageBeingViewed(pageToView: string) {
    this.props.setAdminPageBeingViewed(pageToView);
  }

  render() {
    return (
      <div className="outer-admin-columns">
        <div className="left-rows">
          <div className="admin-info-row">
            <div onClick={() => this._setPageBeingViewed('create')}>Create Player</div>
            <div onClick={() => this._setPageBeingViewed('add-points')}>Add Points to Players</div>
            <div onClick={() => this._setPageBeingViewed('edit-stats')}>Edit Player Stats</div>
          </div>
          {this.props.adminPageBeingViewed === 'create' ? (
            <CreatePlayerForm />
          ) : this.props.adminPageBeingViewed === 'add-points' ? (
            <AddPointsForm />
          ) : this.props.adminPageBeingViewed === 'edit-stats' ? (
            <EditPointsForm />
          ) : null}
        </div>
      </div>
    );
  }
}
export default Admin;
