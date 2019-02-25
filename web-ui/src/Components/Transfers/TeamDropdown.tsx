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
  constructor(props: TeamDropdownProps) {
    super(props);
    this._toggleTeam = this._toggleTeam.bind(this);
    this.state = {
      teamDropDownOpen: false,
      teamValue: 'All teams'
    };
  }

  _toggleTeam() {
    this.setState(prevState => ({
      teamDropDownOpen: !prevState.teamDropDownOpen
    }));
  }

  _handleTeamChange(team: string) {
    this.setState({ teamValue: team });
    this.props.setTeam(team);
  }

  render() {
    const teamOptions = this.props.allCollegeTeams.map(team => (
      <p className="team-menu-items">
        <DropdownItem
          className={'team-menu-item-' + (team.name === this.state.teamValue)}
          key={team.id}
          value={team.name}
          onClick={() => this._handleTeamChange(team.name)}
        >
          {team.name}
        </DropdownItem>
      </p>
    ));

    teamOptions.unshift(
      <p className="team-menu-items">
        <DropdownItem
          className={'team-menu-item-' + (this.state.teamValue === 'All teams')}
          key={'All teams'}
          value={'All teams'}
          onClick={() => this._handleTeamChange('All teams')}
        >
          {'All teams'}
        </DropdownItem>
      </p>
    );

    return (
      <div className="team-dropdown">
        <Dropdown isOpen={this.state.teamDropDownOpen} toggle={this._toggleTeam}>
          {'Team: '} {this.state.teamValue}
          <DropdownToggle caret className="team-menu-toggle">
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
