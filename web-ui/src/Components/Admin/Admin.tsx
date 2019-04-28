import * as React from 'react';
import '../../Style/Admin/Admin.css';
import CreatePlayerForm from './CreatePlayerForm';
import AddPointsForm from './AddPointsForm';
import EditPointsForm from './EditPointsForm';
import DeletePlayerForm from './DeletePlayerForm';
import CreateCollegeTeam from './CreateCollegeTeam';
import DeleteCollegeTeam from './DeleteCollegeTeam';
import { getCollegeTeams } from '../../Services/CollegeTeam/CollegeTeamService';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import AddResult from './AddResult';
import TriggerWeek from './TriggerWeek';
import MakeCaptain from './MakeCaptain';
import { PlayerDTO } from '../../Models/Interfaces/Player';

interface AdminProps {
  addCollegeTeam: (team: CollegeTeam) => void;
  removeCollegeTeam: (teamName: string) => void;

  setAdminPageBeingViewed: (adminPageBeingViewed: string) => void;
  adminPageBeingViewed: string;

  setAllCollegeTeams: (teams: CollegeTeam[]) => void;
  allCollegeTeams: CollegeTeam[];

  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];

}

class Admin extends React.Component<AdminProps, {}> {
	constructor (props: AdminProps) {
		super(props);
		this._setPageBeingViewed = this._setPageBeingViewed.bind(this);
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

	_selectedOrNot (input: string) {
		return input === this.props.adminPageBeingViewed ? 'raise-selected' : 'raise';
	}

	render () {
		const { adminPageBeingViewed } = this.props;
		return (
			<div className="outer-admin-columns">
				<div className="left-rows">
					<div className="admin-info-row">
						<div
							className={this._selectedOrNot('create-player')}
							onClick={() => this.props.setAdminPageBeingViewed('create-player')}
						>
              Create Player
						</div>
						<div
							className={this._selectedOrNot('delete-player')}
							onClick={() => this.props.setAdminPageBeingViewed('delete-player')}
						>
              Delete Player
						</div>
						<div
							className={this._selectedOrNot('create-college-team')}
							onClick={() => this.props.setAdminPageBeingViewed('create-college-team')}
						>
              Create College Team
						</div>
						<div
							className={this._selectedOrNot('delete-college-team')}
							onClick={() => this.props.setAdminPageBeingViewed('delete-college-team')}
						>
              Delete College Team
						</div>
						<div
							className={this._selectedOrNot('add-points')}
							onClick={() => this.props.setAdminPageBeingViewed('add-points')}
						>
              Add Points to Players
						</div>
						<div
							className={this._selectedOrNot('edit-stats')}
							onClick={() => this.props.setAdminPageBeingViewed('edit-stats')}
						>
              Edit Player Stats
						</div>
						<div
							className={this._selectedOrNot('add-result')}
							onClick={() => this.props.setAdminPageBeingViewed('add-result')}
						>
              Create Results
						</div>

						<div
							className={this._selectedOrNot('trigger-week')}
							onClick={() => this.props.setAdminPageBeingViewed('trigger-week')}
						>
              Trigger new week
						</div>
						<div
							className={this._selectedOrNot('make-captain')}
							onClick={() => this.props.setAdminPageBeingViewed('make-captain')}
						>
              Make Captain
						</div>
					</div>
					{adminPageBeingViewed === 'create' ? (
						<CreatePlayerForm
							allCollegeTeams={this.props.allCollegeTeams}
						/>
					) : adminPageBeingViewed === 'add-points' ? (
						<AddPointsForm
							playersInFilteredTeam={this.props.playersInFilteredTeam}
							setTeamAddingPoints={this.props.setTeamAddingPoints}
							teamAddingPoints={this.props.teamAddingPoints}
						/>
					) : adminPageBeingViewed === 'edit-stats' ? (
						<EditPointsForm
							playersInFilteredTeam={this.props.playersInFilteredTeam}
							setTeamAddingPoints={this.props.setTeamAddingPoints}
							teamAddingPoints={this.props.teamAddingPoints}
						/>
					) : adminPageBeingViewed === 'delete-player' ? (
						<DeletePlayerForm
							playersInFilteredTeam={this.props.playersInFilteredTeam}
							setTeamAddingPoints={this.props.setTeamAddingPoints}
							teamAddingPoints={this.props.teamAddingPoints}
						/>
					) : adminPageBeingViewed === 'create-college-team' ? (
						<CreateCollegeTeam
							addCollegeTeam={this.props.addCollegeTeam}
							allCollegeTeams={this.props.allCollegeTeams}
						/>
					) : adminPageBeingViewed === 'delete-college-team' ? (
						<DeleteCollegeTeam
							allCollegeTeams={this.props.allCollegeTeams}
							removeCollegeTeam={this.props.removeCollegeTeam}
						/>
					) : adminPageBeingViewed === 'add-result' ? (
						<AddResult
							setTeamAddingPoints={this.props.setTeamAddingPoints}
						/>
					) : adminPageBeingViewed === 'trigger-week' ? (
						<TriggerWeek />
					) : adminPageBeingViewed === 'make-captain' ? (
						<MakeCaptain
							allCollegeTeams={this.props.allCollegeTeams}
						/>
					) : null}
				</div>
			</div>
		);
	}
}
export default Admin;
