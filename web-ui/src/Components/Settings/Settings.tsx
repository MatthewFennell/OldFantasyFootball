import * as React from 'react';
import ChangeTeamName from './ChangeTeamName';
import ChangePassword from './ChangePassword';
import '../../Style/Settings/Settings.css';

interface SettingsProps {
}

interface SettingsState {
	lastClicked: string;
  }

// eslint-disable-next-line react/require-optimization
class Settings extends React.Component<SettingsProps, SettingsState> {
	constructor (props: SettingsProps) {
		super(props);
		this.handleLastClicked = this.handleLastClicked.bind(this);
		this.state = {
			lastClicked: ''
		};
	}

	handleLastClicked (lastClicked: string) {
		this.setState({ lastClicked });
	}

	_selectedOrNot (input: string) {
		return input === this.state.lastClicked ? 'raise-settings-selected' : 'raise-settings';
	}

	render () {
		return (
			<div className="outer-settings-columns">
				<div className="left-rows">
					<div className="settings-info-row">
						<div
							className="settings-wrapper"
							onClick={() => this.handleLastClicked('rules')}
						>
							<div
								className={this._selectedOrNot('rules')}
							>
								<div className="settings-header">
              					Rules
								  </div>

							</div>
							<div className="settings-rules">
								Some rules
							</div>
						</div>
						<div
							className="settings-wrapper"
							onClick={() => this.handleLastClicked('team-name')}
						>
							<div
								className={this._selectedOrNot('team-name')}
							>
								<div className="settings-header">
              Change team name
			  </div>
			  <ChangeTeamName />
							</div>

						</div>
						<div
							className="settings-wrapper"
							onClick={() => this.handleLastClicked('password')}
						>
							<div
								className={this._selectedOrNot('password')}
							>
								<div className="settings-header">
              Change password
			  </div>
			  <ChangePassword />
							</div>

						</div>
					</div>

				</div>
			</div>
		);
	}
}
export default Settings;
