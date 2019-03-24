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
	constructor (props: AdminProps) {
		super(props);
		this._setPageBeingViewed = this._setPageBeingViewed.bind(this);
		this.handleSetPageBeingViewedCreate = this.handleSetPageBeingViewedCreate.bind(this);
		this.handleSetPageBeingViewedDeletePlayer = this.handleSetPageBeingViewedDeletePlayer.bind(this);
		this.handleSetPageBeingViewedDeleteCollegeTeam = this.handleSetPageBeingViewedDeleteCollegeTeam.bind(this);
		this.handleSetPageBeingViewedCreateCollegeTeam = this.handleSetPageBeingViewedCreateCollegeTeam.bind(this);
		this.handleSetPageBeingViewedAddPoints = this.handleSetPageBeingViewedAddPoints.bind(this);
		this.handleSetPageBeingViewedAddResult = this.handleSetPageBeingViewedAddResult.bind(this);
		this.handleSetPageBeingViewedEditStats = this.handleSetPageBeingViewedEditStats.bind(this);

		const { allCollegeTeams, setAllCollegeTeams } = this.props;

		if (allCollegeTeams.length === 0) {
			getCollegeTeams('alphabetical').then(response => {
				setAllCollegeTeams(response);
			});
		}
	}

	_setPageBeingViewed (pageToView: string) {
		this.props.setAdminPageBeingViewed(pageToView);
	}

	handleSetPageBeingViewedCreate () {
		this.props.setAdminPageBeingViewed('create');
	}

	handleSetPageBeingViewedDeletePlayer () {
		this.props.setAdminPageBeingViewed('delete-player');
	}

	handleSetPageBeingViewedCreateCollegeTeam () {
		this.props.setAdminPageBeingViewed('create-college-team');
	}

	handleSetPageBeingViewedDeleteCollegeTeam () {
		this.props.setAdminPageBeingViewed('delete-college-team');
	}

	handleSetPageBeingViewedAddPoints () {
		this.props.setAdminPageBeingViewed('add-points');
	}

	handleSetPageBeingViewedEditStats () {
		this.props.setAdminPageBeingViewed('edit-stats');
	}

	handleSetPageBeingViewedAddResult () {
		this.props.setAdminPageBeingViewed('add-result');
	}

	_selectedOrNot (input: string) {
		const { adminPageBeingViewed } = this.props;
		if (input === adminPageBeingViewed) {
			return 'raise-selected';
		} else {
			return 'raise';
		}
	}

	render () {
		const { adminPageBeingViewed } = this.props;
		return (
			<div className="outer-admin-columns">
				<div className="left-rows">
					<div className="admin-info-row">
						<div
							className={this._selectedOrNot('create')}
							onClick={this.handleSetPageBeingViewedCreate}
						>
              Create Player
						</div>
						<div
							className={this._selectedOrNot('delete-player')}
							onClick={this.handleSetPageBeingViewedDeletePlayer}
						>
              Delete Player
						</div>
						<div
							className={this._selectedOrNot('create-college-team')}
							onClick={this.handleSetPageBeingViewedCreateCollegeTeam}
						>
              Create College Team
						</div>
						<div
							className={this._selectedOrNot('delete-college-team')}
							onClick={this.handleSetPageBeingViewedDeleteCollegeTeam}
						>
              Delete College Team
						</div>
						<div
							className={this._selectedOrNot('add-points')}
							onClick={this.handleSetPageBeingViewedAddPoints}
						>
              Add Points to Players
						</div>
						<div
							className={this._selectedOrNot('edit-stats')}
							onClick={this.handleSetPageBeingViewedEditStats}
						>
              Edit Player Stats
						</div>
						<div
							className={this._selectedOrNot('add-result')}
							onClick={this.handleSetPageBeingViewedAddResult}
						>
              Create Results
						</div>
					</div>
					{adminPageBeingViewed === 'create' ? (
						<CreatePlayerForm />
					) : adminPageBeingViewed === 'add-points' ? (
						<AddPointsForm />
					) : adminPageBeingViewed === 'edit-stats' ? (
						<EditPointsForm />
					) : adminPageBeingViewed === 'delete-player' ? (
						<DeletePlayerForm />
					) : adminPageBeingViewed === 'create-college-team' ? (
						<CreateCollegeTeam />
					) : adminPageBeingViewed === 'delete-college-team' ? (
						<DeleteCollegeTeam />
					) : adminPageBeingViewed === 'add-result' ? (
						<AddResult />
					) : null}
				</div>
			</div>
		);
	}
}
export default Admin;
