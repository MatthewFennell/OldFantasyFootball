import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface YellowCardProps {
  yellowCards: (team: string) => void;
}

interface YellowCardState {
  yellowCardOpen: boolean;
  yellowCards: string;
}

class YellowCard extends React.Component<YellowCardProps, YellowCardState> {
	constructor (props: YellowCardProps) {
		super(props);
		this._toggleYellowCards = this._toggleYellowCards.bind(this);
		this.state = {
			yellowCardOpen: false,
			yellowCards: '0'
		};
	}

	_toggleYellowCards () {
		this.setState(prevState => ({
			yellowCardOpen: !prevState.yellowCardOpen
		}));
	}

	_handleTeamChange (yellowCards: string) {
		this.setState({ yellowCards });
		this.props.yellowCards(yellowCards);
	}

	render () {
		let options: string[] = ['0', '1', '2'];
		const teamOptions = options.map(option => (
			<p
				className="team-menu-items"
				key={option}
			>
				<DropdownItem
					className={'team-menu-item-' + (option === this.state.yellowCards)}
					key={option}
					onClick={() => this._handleTeamChange(option)}
					value={option}
				>
					{option}
				</DropdownItem>
			</p>
		));

		return (
			<div className="team-dropdown">
				<Dropdown
					isOpen={this.state.yellowCardOpen}
					toggle={this._toggleYellowCards}
				>
					{'Yellow Cards: '} {this.state.yellowCards}
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
export default YellowCard;
