import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

import { PlayerDTO } from '../../../Models/Interfaces/Player';

interface SelectPlayerProps {
  setPlayerID: (id: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

interface SelectPlayerState {
  selectPlayerOpen: boolean;
  playerSelected: string;
}

class SelectPlayer extends React.Component<SelectPlayerProps, SelectPlayerState> {
  constructor(props: SelectPlayerProps) {
    super(props);
    this._toggleTeam = this._toggleTeam.bind(this);
    this.state = {
      selectPlayerOpen: false,
      playerSelected: 'None selected'
    };
  }

  _toggleTeam() {
    this.setState(prevState => ({
      selectPlayerOpen: !prevState.selectPlayerOpen
    }));
  }

  _handlePlayerIDChange(id: string[]) {
    this.setState({ playerSelected: id[0] });
    this.props.setPlayerID(id[1]);
  }

  render() {
    // TO:DO - fetch the teams from the server
    let teams: string[][] = [];
    for (let x = 0; x < this.props.playersInFilteredTeam.length; x++) {
      teams.push([
        this.props.playersInFilteredTeam[x].firstName +
          ' ' +
          this.props.playersInFilteredTeam[x].surname,
        this.props.playersInFilteredTeam[x].id
      ]);
    }

    const teamOptions = teams.map(team => (
      <p className="menu-items">
        <DropdownItem
          className={'team-menu-item-' + (team[0] === this.state.playerSelected)}
          key={team[1]}
          value={team[0]}
          onClick={() => this._handlePlayerIDChange(team)}
        >
          {team[0]}
        </DropdownItem>
      </p>
    ));

    return (
      <div className="team-dropdown">
        <Dropdown isOpen={this.state.selectPlayerOpen} toggle={this._toggleTeam}>
          {'Player: '} {this.state.playerSelected}
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
export default SelectPlayer;
