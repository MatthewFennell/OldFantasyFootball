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
		this.setState({ cleanSheet: team });
		if (team === 'Yes') {
			this.props.setCleanSheet(true);
		} else {
			this.props.setCleanSheet(false);
		}
	}

	render () {
		let cleanSheets: string[] = ['Yes', 'No'];
		const teamOptions = cleanSheets.map(cleanSheet => (
			<p className="team-menu-items" key = { cleanSheet }>
				<DropdownItem
					className={ 'team-menu-item-' + (cleanSheet === this.state.cleanSheet) }
					key={ cleanSheet }
					value={ cleanSheet }
					onClick={ () => this._handleCleanSheetChange(cleanSheet) }
				>
					{cleanSheet}
				</DropdownItem>
			</p>
		));

		return (
			<div className="team-dropdown">
				<Dropdown isOpen={ this.state.cleanSheetOpen } toggle={ this._toggleTeam }>
					{'Clean Sheet: '} {this.state.cleanSheet}
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
export default CleanSheet;
