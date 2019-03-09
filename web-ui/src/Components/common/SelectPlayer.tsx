import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { PlayerDTO } from '../../Models/Interfaces/Player';

interface SelectPlayerProps {
  setPlayerID: (id: string, previousID: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
  onlyDefenders: boolean;
}

interface SelectPlayerState {
  selectPlayerOpen: boolean;
  playerSelected: string;
  playerSelectedID: string;
}

class SelectPlayer extends React.Component<SelectPlayerProps, SelectPlayerState> {
	constructor (props: SelectPlayerProps) {
		super(props);
		this._toggleTeam = this._toggleTeam.bind(this);
		this.state = {
			selectPlayerOpen: false,
			playerSelected: 'None selected',
			playerSelectedID: 'No-id'
		};
	}

	_toggleTeam () {
		this.setState(prevState => ({
			selectPlayerOpen: !prevState.selectPlayerOpen
		}));
	}

	_handlePlayerIDChange (id: string[]) {
		let previousValue = this.state.playerSelectedID;
		this.setState({ playerSelected: id[0] });
		this.setState({ playerSelectedID: id[1] });
		this.props.setPlayerID(id[1], previousValue);
	}

	render () {
		let teams: string[][] = [];
		for (let x = 0; x < this.props.playersInFilteredTeam.length; x++) {
			if (this.props.onlyDefenders) {
				if (
					this.props.playersInFilteredTeam[x].position === 'DEFENDER' ||
          this.props.playersInFilteredTeam[x].position === 'GOALKEEPER'
				) {
					teams.push([
						this.props.playersInFilteredTeam[x].firstName +
              ' ' +
              this.props.playersInFilteredTeam[x].surname,
						this.props.playersInFilteredTeam[x].id
					]);
				}
			} else {
				teams.push([
					this.props.playersInFilteredTeam[x].firstName +
            ' ' +
            this.props.playersInFilteredTeam[x].surname,
					this.props.playersInFilteredTeam[x].id
				]);
			}
		}

		const teamOptions = teams.map(team => (
			<p
				className="team-menu-items"
				key={team[0]}
			>
				<DropdownItem
					className={'team-menu-item-' + (team[0] === this.state.playerSelected)}
					key={team[1]}
					onClick={() => this._handlePlayerIDChange(team)}
					value={team[0]}
				>
					{team[0]}
				</DropdownItem>
			</p>
		));

		return (
			<div className="team-dropdown">
				<Dropdown
					isOpen={this.state.selectPlayerOpen}
					toggle={this._toggleTeam}
				>
					{'Player: '} {this.state.playerSelected}
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
export default SelectPlayer;
