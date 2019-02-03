import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { findPlayersInCollegeTeam } from '../../../Services/Player/PlayerService';

import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface TeamDropdownProps {
  setTeam: (team: string) => void;
  setPlayersInFilteredTeam: (players: PlayerDTO[]) => void;
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
      teamValue: 'A'
    };
    findPlayersInCollegeTeam('A').then(response => {
      this.props.setPlayersInFilteredTeam(response);
    });
  }

  _toggleTeam() {
    this.setState(prevState => ({
      teamDropDownOpen: !prevState.teamDropDownOpen
    }));
  }

  _handleTeamChange(team: string) {
    this.setState({ teamValue: team });
    this.props.setTeam(team);
    findPlayersInCollegeTeam(team)
      .then(response => {
        this.props.setPlayersInFilteredTeam(response);
      })
      .catch(error => {
        this.props.setPlayersInFilteredTeam([]);
      });
  }

  render() {
    // TO:DO - fetch the teams from the server
    let teams: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
    const teamOptions = teams.map(team => (
      <p className="menu-items">
        <DropdownItem
          className={'team-menu-item-' + (team === this.state.teamValue)}
          key={team}
          value={team}
          onClick={() => this._handleTeamChange(team)}
        >
          {team}
        </DropdownItem>
      </p>
    ));

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
