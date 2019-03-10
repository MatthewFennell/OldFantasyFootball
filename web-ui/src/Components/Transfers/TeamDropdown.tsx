import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../../Style/Transfers/TeamDropdown.css';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';

interface TeamDropdownProps {
  setTeam: (team: string) => void;
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
		this.state = {
			teamDropDownOpen: false,
			teamValue: 'All teams'
		};
	}

	_toggleTeam () {
		this.setState(prevState => ({
			teamDropDownOpen: !prevState.teamDropDownOpen
		}));
	}

	_handleTeamChange (team: string) {
		const { setTeam } = this.props;
		this.setState({ teamValue: team });
		setTeam(team);
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
					key={team.id}
					onClick={() => this._handleTeamChange(team.name)}
					value={team.name}
				>
					{team.name}
				</DropdownItem>
			</p>
		));

		teamOptions.unshift(
			<p className="team-menu-items">
				<DropdownItem
					className={'team-menu-item-' + (teamValue === 'All teams')}
					key="All teams"
					onClick={() => this._handleTeamChange('All teams')}
					value="All teams"
				>
					{'All teams'}
				</DropdownItem>
			</p>
		);

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
