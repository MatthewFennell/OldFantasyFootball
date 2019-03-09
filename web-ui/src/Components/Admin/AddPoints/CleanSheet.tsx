import * as React from 'react';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

interface CleanSheetProps {
  setCleanSheet: (team: boolean) => void;
}

interface CleanSheetState {
  cleanSheetOpen: boolean;
  cleanSheet: string;
}

class CleanSheet extends React.Component<CleanSheetProps, CleanSheetState> {
	constructor (props: CleanSheetProps) {
		super(props);
		this._toggleTeam = this._toggleTeam.bind(this);
		this.state = {
			cleanSheetOpen: false,
			cleanSheet: 'No'
		};
	}

	_toggleTeam () {
		this.setState(prevState => ({
			cleanSheetOpen: !prevState.cleanSheetOpen
		}));
	}

	_handleCleanSheetChange (team: string) {
		const { setCleanSheet } = this.props;
		this.setState({ cleanSheet: team });
		if (team === 'Yes') {
			setCleanSheet(true);
		} else {
			setCleanSheet(false);
		}
	}

	render () {
		const { cleanSheet, cleanSheetOpen } = this.state;
		let cleanSheets: string[] = ['Yes', 'No'];
		const teamOptions = cleanSheets.map(clean => (
			<p
				className="team-menu-items"
				key={clean}
			>
				<DropdownItem
					className={'team-menu-item-' + (clean === cleanSheet)}
					key={clean}
					onClick={() => this._handleCleanSheetChange(clean)}
					value={clean}
				>
					{clean}
				</DropdownItem>
			</p>
		));

		return (
			<div className="team-dropdown">
				<Dropdown
					isOpen={cleanSheetOpen}
					toggle={this._toggleTeam}
				>
					{'Clean Sheet: '} {cleanSheet}
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
export default CleanSheet;
