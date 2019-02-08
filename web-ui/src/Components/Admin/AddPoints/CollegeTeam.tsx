import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { findPlayersInCollegeTeam } from '../../../Services/Player/PlayerService';
import { CollegeTeam } from '../../../Models/Interfaces/CollegeTeam';

import { PlayerDTO } from '../../../Models/Interfaces/Player';

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
  constructor(props: TeamDropdownProps) {
    super(props);
    this._toggleTeam = this._toggleTeam.bind(this);

    if (this.props.allCollegeTeams.length > 0) {
      this.state = {
        teamDropDownOpen: false,
        teamValue: this.props.allCollegeTeams[0].name
      };
      findPlayersInCollegeTeam(this.props.allCollegeTeams[0].name).then(response => {
        this.props.setPlayersInFilteredTeam(response);
      });
    } else {
      this.state = {
        teamDropDownOpen: false,
        teamValue: 'A'
      };
      findPlayersInCollegeTeam('A').then(response => {
        this.props.setPlayersInFilteredTeam(response);
      });
    }
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
        console.log('error message : ' + error);
        this.props.setPlayersInFilteredTeam([]);
      });
  }

  render() {
    // TO:DO - fetch the teams from the server

    const teamOptions = this.props.allCollegeTeams.map(team => (
      <p className="menu-items">
        <DropdownItem
          className={'team-menu-item-' + (team.name === this.state.teamValue)}
          key={team.name}
          value={team}
          onClick={() => this._handleTeamChange(team.name)}
        >
          {team.name}
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
