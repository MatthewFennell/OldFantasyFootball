import * as React from 'react';
import ChangeTeamName from './ChangeTeamName';
import '../../Style/Settings/Settings.css';

interface SettingsProps {
}

// eslint-disable-next-line react/require-optimization
class Settings extends React.Component<SettingsProps, {}> {
	constructor (props: SettingsProps) {
		super(props);
		this._setPageBeingViewed = this._setPageBeingViewed.bind(this);
		this.handleSetPageBeingViewedCreate = this.handleSetPageBeingViewedCreate.bind(this);
		this.handleSetPageBeingViewedDeletePlayer = this.handleSetPageBeingViewedDeletePlayer.bind(this);
	}

	_setPageBeingViewed (pageToView: string) {
		// this.props.setSettingsPageBeingViewed(pageToView);
	}

	handleSetPageBeingViewedCreate () {
		// this.props.setSettingsPageBeingViewed('create');
	}

	handleSetPageBeingViewedDeletePlayer () {
		// this.props.setSettingsPageBeingViewed('delete-player');
	}

	handleSetPageBeingViewedCreateCollegeTeam () {
		// this.props.setSettingsPageBeingViewed('create-college-team');
	}

	_selectedOrNot (input: string) {
		return 'raise';
	}

	render () {
		// const { SettingsPageBeingViewed } = this.props;
		return (
			<div className="outer-settings-columns">
				<div className="left-rows">
					<div className="settings-info-row">
						<div className="settings-wrapper">
							<div
								className="raise-selected"
								onClick={this.handleSetPageBeingViewedCreate}
							>
              Rules

							</div>
							<div className="settings-rules">
								Some rules
							</div>
						</div>
						<div className="settings-wrapper">
							<div
								className="raise-selected"
								onClick={this.handleSetPageBeingViewedDeletePlayer}
							>
              Change team name
							</div>
							<ChangeTeamName />
						</div>
						<div className="settings-wrapper">
							<div
								className="raise-selected"
								onClick={this.handleSetPageBeingViewedCreateCollegeTeam}
							>
              Change password
							</div>
							<ChangeTeamName />
						</div>
					</div>

				</div>
			</div>
		);
	}
}
export default Settings;
