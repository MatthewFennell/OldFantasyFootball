import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface ManOfTheMatchProps {
  setManOfTheMatch: (team: boolean) => void;
}

interface ManOfTheMatchState {
  ManOfTheMatchOpen: boolean;
  manOfTheMatch: string;
}

class ManOfTheMatch extends React.Component<ManOfTheMatchProps, ManOfTheMatchState> {
	constructor (props: ManOfTheMatchProps) {
		super(props);
		this._toggleManOfTheMatch = this._toggleManOfTheMatch.bind(this);
		this.state = {
			ManOfTheMatchOpen: false,
			manOfTheMatch: 'No'
		};
	}

	_toggleManOfTheMatch () {
		this.setState(prevState => ({
			ManOfTheMatchOpen: !prevState.ManOfTheMatchOpen
		}));
	}

	_handleTeamChange (manOfTheMatch: string) {
		const { setManOfTheMatch } = this.props;
		this.setState({ manOfTheMatch: manOfTheMatch });
		if (manOfTheMatch === 'Yes') {
			setManOfTheMatch(true);
		} else {
			setManOfTheMatch(false);
		}
	}

	render () {
		const { manOfTheMatch, ManOfTheMatchOpen } = this.state;
		let options: string[] = ['Yes', 'No'];
		const teamOptions = options.map(option => (
			<p
				className="team-menu-items"
				key={option}
			>
				<DropdownItem
					className={'team-menu-item-' + (option === manOfTheMatch)}
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
					isOpen={ManOfTheMatchOpen}
					toggle={this._toggleManOfTheMatch}
				>
					{'Man of the Match: '} {manOfTheMatch}
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
export default ManOfTheMatch;
