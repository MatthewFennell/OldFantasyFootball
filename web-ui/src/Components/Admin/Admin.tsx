import * as React from 'react';
import '../../Style/Admin/Admin.css';
import CreatePlayerForm from '../../Containers/Admin/CreatePlayerForm';

interface AdminProps {
  setAdminPageBeingViewed: (adminPageBeingViewed: string) => void;
}

class Admin extends React.Component<AdminProps, {}> {
  _setPageBeingViewed(pageToView: string) {
    this.props.setAdminPageBeingViewed(pageToView);
  }

  render() {
    console.log('Page being viewed = ');
    console.log('Page being viewed = ');
    console.log('Page being viewed = ');
    console.log('Page being viewed = ');

    this._setPageBeingViewed('hello');

    return (
      <div className="outer-admin-columns">
        <div className="left-rows">
          <div className="admin-info-row">
            <div onClick={() => this._setPageBeingViewed('create')}>Create Player</div>
            <div onClick={() => this._setPageBeingViewed('add-points')}>Add Points to Players</div>
            <div onClick={() => this._setPageBeingViewed('edit-stats')}>Edit Player Stats</div>
          </div>
          <CreatePlayerForm />
        </div>
      </div>
    );
  }
}
export default Admin;
