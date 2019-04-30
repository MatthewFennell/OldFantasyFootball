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
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { getIsAdmin } from '../../Services/User/UserService';

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
  setPageBeingViewed: (page: string) => void;

}

interface AdminState {
	isAdmin: boolean;
}

class Admin extends React.Component<RoutedFormProps<RouteComponentProps> & AdminProps, AdminState> {
	constructor (props: RoutedFormProps<RouteComponentProps> & AdminProps) {
		super(props);
		const { allCollegeTeams, setAllCollegeTeams } = this.props;
		this.state = {
			isAdmin: false
		};
		if (allCollegeTeams.length === 0) {
			getCollegeTeams('alphabetical').then(response => {
				setAllCollegeTeams(response);
			});
		}
		getIsAdmin().then(response => {
			if (response === false) {
				this.props.setPageBeingViewed('Team');
				this.props.history.push('/team');
			} else {
				this.setState({ isAdmin: true });
			}
		});
		const createHandler = message => () => this.props.setAdminPageBeingViewed(message)
		this.handlers = {
			createPlayer: createHandler('create-player')
		}
	}

	_selectedOrNot (input: string) {
		return input === this.props.adminPageBeingViewed ? 'raise-selected' : 'raise';
	}

	render () {
		const { adminPageBeingViewed } = this.props;
		return (
			 this.state.isAdmin
				? (<div className="outer-admin-columns">
					<div className="left-rows">
						<div className="admin-info-row">
							<div
								className={this._selectedOrNot('create-player')}
								onClick={this.handlers.createPlayer}
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
						{adminPageBeingViewed === 'create-player' ? (
							<CreatePlayerForm
								allCollegeTeams={this.props.allCollegeTeams}
								collegeTeamName=''
							/>
						) : adminPageBeingViewed === 'add-points' ? (
							<AddPointsForm
								playersInFilteredTeam={this.props.playersInFilteredTeam}
								setTeamAddingPoints={this.props.setTeamAddingPoints}
								teamAddingPoints={this.props.teamAddingPoints}
							/>
						) : adminPageBeingViewed === 'edit-stats' ? (
							<EditPointsForm
								collegeTeamName=''
								playersInFilteredTeam={this.props.playersInFilteredTeam}
								setTeamAddingPoints={this.props.setTeamAddingPoints}
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
								allCollegeTeams={this.props.allCollegeTeams}
								collegeTeamName=''
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
				</div>)

				: null

		);
	}
}
export default withRouter(Admin);
