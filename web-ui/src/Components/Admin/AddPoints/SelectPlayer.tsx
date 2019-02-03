import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface TeamDropdownProps {
  setPlayerID: (id: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
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
      teamValue: 'None selected'
    };
  }

  _toggleTeam() {
    this.setState(prevState => ({
      teamDropDownOpen: !prevState.teamDropDownOpen
    }));
  }

  _handlePlayerIDChange(id: string) {
    this.setState({ teamValue: id });
    this.props.setPlayerID(id);
  }

  render() {
    // TO:DO - fetch the teams from the server
    let teams: string[] = [];
    for (let x = 0; x < this.props.playersInFilteredTeam.length; x++) {
      teams.push(
        this.props.playersInFilteredTeam[x].firstName +
          ' ' +
          this.props.playersInFilteredTeam[x].surname
      );
    }

    const teamOptions = teams.map(team => (
      <p className="menu-items">
        <DropdownItem
          className={'team-menu-item-' + (team === this.state.teamValue)}
          key={team}
          value={team}
          onClick={() => this._handlePlayerIDChange(team)}
        >
          {team}
        </DropdownItem>
      </p>
    ));

    return (
      <div className="team-dropdown">
        <Dropdown isOpen={this.state.teamDropDownOpen} toggle={this._toggleTeam}>
          {'Player: '} {this.state.teamValue}
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
