import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import '../../Style/Transfers/TeamDropdown.css';

interface TeamDropdownProps {
  setTeam: (team: string) => void;
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
      teamValue: 'All'
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
