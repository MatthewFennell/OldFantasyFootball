/* eslint-disable react/jsx-no-bind */
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
		const { playerSelectedID } = this.state;
		const { setPlayerID } = this.props;
		let previousValue = playerSelectedID;
		this.setState({ playerSelected: id[0] });
		this.setState({ playerSelectedID: id[1] });
		setPlayerID(id[1], previousValue);
	}

	render () {
		const { onlyDefenders, playersInFilteredTeam } = this.props;
		const { selectPlayerOpen, playerSelected } = this.state;
		let teams: string[][] = [];
		playersInFilteredTeam.map(value => {
			if (onlyDefenders) {
				if (value.position === 'DEFENDER' || value.position === 'GOALKEEPER') {
					teams.push([value.firstName + ' ' + value.surname, value.id]);
				}
			} else {
				teams.push([value.firstName + ' ' + value.surname, value.id]);
			}
		});

		const teamOptions = teams.map((team, index) => (
			<p
				className="team-menu-items"
				key={team[0] + index}
			>
				<DropdownItem
					className={'team-menu-item-' + (team[0] === this.state.playerSelected)}
					key={team[1] + index}
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
					isOpen={selectPlayerOpen}
					toggle={this._toggleTeam}
				>
					<span
						className="selectPlayerDropdown"
						onClick={this._toggleTeam}
					>Player:  {playerSelected}</span>
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
