import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { findPlayersInCollegeTeam } from '../../Services/Player/PlayerService';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import { PlayerDTO } from '../../Models/Interfaces/Player';

interface TeamDropdownProps {
  setTeam: (team: string) => void;
  setPlayersInFilteredTeam: (players: PlayerDTO[]) => void;
  allCollegeTeams: CollegeTeam[];
}

interface TeamDropdownState {
  teamDropDownOpen: boolean;
  teamValue: string;
}

class TeamDropdown extends React.Component<TeamDropdownProps, TeamDropdownState> {
	constructor (props: TeamDropdownProps) {
		super(props);
		this._toggleTeam = this._toggleTeam.bind(this);

		const { allCollegeTeams, setPlayersInFilteredTeam } = this.props;

		if (allCollegeTeams.length > 0) {
			this.state = {
				teamDropDownOpen: false,
				teamValue: allCollegeTeams[0].name
			};
			findPlayersInCollegeTeam(allCollegeTeams[0].name).then(response => {
				setPlayersInFilteredTeam(response);
			});
		} else {
			this.state = {
				teamDropDownOpen: false,
				teamValue: 'No team selected'
			};
			setPlayersInFilteredTeam([]);
		}
	}

	_toggleTeam () {
		this.setState(prevState => ({
			teamDropDownOpen: !prevState.teamDropDownOpen
		}));
	}

	_handleTeamChange (team: string) {
		const { setTeam, setPlayersInFilteredTeam } = this.props;
		this.setState({ teamValue: team });
		setTeam(team);
		findPlayersInCollegeTeam(team)
			.then(response => {
				setPlayersInFilteredTeam(response);
			})
			.catch(error => {
				console.log(error);
				setPlayersInFilteredTeam([]);
			});
	}

	render () {
		const { allCollegeTeams } = this.props;
		const { teamValue, teamDropDownOpen } = this.state;
		const teamOptions = allCollegeTeams.map(team => (
			<p
				className="team-menu-items"
				key={team.id}
			>
				<DropdownItem
					className={'team-menu-item-' + (team.name === teamValue)}
					key={team.name}
					onClick={() => this._handleTeamChange(team.name)}
					value={team}
				>
					{team.name}
				</DropdownItem>
			</p>
		));

		return (
			<div className="team-dropdown">
				<Dropdown
					isOpen={teamDropDownOpen}
					toggle={this._toggleTeam}
				>
					{'Team: '} {teamValue}
					<DropdownToggle
						caret
						className="team-menu-toggle"
					>
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="team-menu">{teamOptions}</DropdownMenu>
				</Dropdown>
			</div>
		);
	}
}
export default TeamDropdown;
