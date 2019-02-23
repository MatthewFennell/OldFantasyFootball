import * as React from 'react';
import '../../Style/Admin/Admin.css';
import CreatePlayerForm from '../../Containers/Admin/CreatePlayerForm';
import AddPointsForm from '../../Containers/Admin/AddPointsForm';
import EditPointsForm from '../../Containers/Admin/EditPointsForm';
import DeletePlayerForm from '../../Containers/Admin/DeletePlayerForm';
import CreateCollegeTeam from '../../Containers/Admin/CreateCollegeTeam';
import DeleteCollegeTeam from '../../Containers/Admin/DeleteCollegeTeam';
import { getCollegeTeams } from '../../Services/CollegeTeam/CollegeTeamService';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import AddResult from '../../Containers/Admin/AddResult';

interface AdminProps {
  setAdminPageBeingViewed: (adminPageBeingViewed: string) => void;
  adminPageBeingViewed: string;

  setAllCollegeTeams: (teams: CollegeTeam[]) => void;
  allCollegeTeams: CollegeTeam[];
}

class Admin extends React.Component<AdminProps, {}> {
  constructor(props: AdminProps) {
    super(props);
    this._setPageBeingViewed = this._setPageBeingViewed.bind(this);

    if (this.props.allCollegeTeams.length === 0) {
      getCollegeTeams('alphabetical').then(response => {
        this.props.setAllCollegeTeams(response);
      });
    }
  }

  _setPageBeingViewed(pageToView: string) {
    this.props.setAdminPageBeingViewed(pageToView);
  }

  _selectedOrNot(input: string) {
    if (input === this.props.adminPageBeingViewed) {
      return 'raise-selected';
    } else {
      return 'raise';
    }
  }

  render() {
    return (
      <div className="outer-admin-columns">
        <div className="left-rows">
          <div className="admin-info-row">
            <div
              className={this._selectedOrNot('create')}
              onClick={() => this._setPageBeingViewed('create')}
            >
              Create Player
            </div>
            <div
              className={this._selectedOrNot('delete-player')}
              onClick={() => this._setPageBeingViewed('delete-player')}
            >
              Delete Player
            </div>
            <div
              className={this._selectedOrNot('create-college-team')}
              onClick={() => this._setPageBeingViewed('create-college-team')}
            >
              Create College Team
            </div>
            <div
              className={this._selectedOrNot('delete-college-team')}
              onClick={() => this._setPageBeingViewed('delete-college-team')}
            >
              Delete College Team
            </div>
            <div
              className={this._selectedOrNot('add-points')}
              onClick={() => this._setPageBeingViewed('add-points')}
            >
              Add Points to Players
            </div>
            <div
              className={this._selectedOrNot('edit-stats')}
              onClick={() => this._setPageBeingViewed('edit-stats')}
            >
              Edit Player Stats
            </div>
            <div
              className={this._selectedOrNot('add-result')}
              onClick={() => this._setPageBeingViewed('add-result')}
            >
              Create Results
            </div>
          </div>
          {this.props.adminPageBeingViewed === 'create' ? (
            <CreatePlayerForm />
          ) : this.props.adminPageBeingViewed === 'add-points' ? (
            <AddPointsForm />
          ) : this.props.adminPageBeingViewed === 'edit-stats' ? (
            <EditPointsForm />
          ) : this.props.adminPageBeingViewed === 'delete-player' ? (
            <DeletePlayerForm />
          ) : this.props.adminPageBeingViewed === 'create-college-team' ? (
            <CreateCollegeTeam />
          ) : this.props.adminPageBeingViewed === 'delete-college-team' ? (
            <DeleteCollegeTeam />
          ) : this.props.adminPageBeingViewed === 'add-result' ? (
            <AddResult />
          ) : null}
        </div>
      </div>
    );
  }
}
export default Admin;
