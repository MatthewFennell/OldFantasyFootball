import * as React from 'react';
import ChangeTeamName from './ChangeTeamName';
import ChangePassword from './ChangePassword';
import EditTeamName from './EditTeamName';
import EditPassword from './EditPassword';
import '../../Style/Settings/Settings.css';
import { getRules } from '../../Services/Points/PointsService';
import { Rules } from '../../Models/Interfaces/Rules';
import Media from 'react-media';

interface SettingsProps {
	setRules: (rules: Rules) => void;
	rules: Rules;
}

interface SettingsState {
	lastClicked: string;
  }

class Settings extends React.Component<SettingsProps, SettingsState> {
	constructor (props: SettingsProps) {
		super(props);
		this.handleLastClicked = this.handleLastClicked.bind(this);
		this.getStatsRules = this.getStatsRules.bind(this);
		this.state = {
			lastClicked: ''
		};
		this.getStatsRules();
		const createHandler = (message: string) => () => this.handleLastClicked(message);
		this.handlers = {
			handleRules: createHandler('rules'),
			handleTeamName: createHandler('team-name'),
			handlePassword: createHandler('password'),
		};
	}

	handlers: { handleRules: () => void;
		handleTeamName: () => void;
		handlePassword: () => void;
	};

	handleLastClicked (lastClicked: string) {
		this.setState({ lastClicked });
	}

	_selectedOrNot (input: string) {
		return input === this.state.lastClicked ? 'raise-settings-selected' : 'raise-settings';
	}

	getStatsRules () {
		if (Object.entries(this.props.rules).length === 0) {
			getRules()
				.then(response => {
					this.props.setRules(response);
				})
				.catch(() => {
				});
		}
	}

	render () {
		const { rules } = this.props;

		return (

			<Media query="(max-width: 599px)">
				{matches =>
					matches ? (
						<div className="settings-mobile-wrapper">
							<div className="settings-header">
								Settings
							</div>
							<div className="flex-container-two">
								<div
									className={this._selectedOrNot('rules')}
									onClick={this.handlers.handleRules}
								>
										Rules
								</div>
								<div
									className={this._selectedOrNot('team-name')}
									onClick={this.handlers.handleTeamName}
								>
										Change Team Name
								</div>
								<div
									className={this._selectedOrNot('password')}
									onClick={this.handlers.handlePassword}
								>
										Change Password
								</div>
							</div>
							{this.state.lastClicked === 'rules'
								? <div
									className="rules"
								  >
			  							<ul>
										  <li>When the transfer window is open, you can make unlimited transfers</li>
										  <li>Goals</li>
										  <ul>
											  <li>Attacker: {rules.pointsPerAttackerGoal} points</li>
											  <li>Midfielder: {rules.pointsPerMidfielderGoal} points</li>
											  <li>Defender: {rules.pointsPerDefenderGoal} points</li>
										  </ul>
										  <li>Assists: {rules.pointsPerAssists} points</li>
										  <li>Clean Sheet: {rules.pointsPerCleanSheet} points</li>
										  <li>Yellow Card: {rules.pointsPerYellowCard} points</li>
										  <li>Red Card: {rules.pointsPerRedCard} points</li>
										  <li>Man of the Match: {rules.manOfTheMatchBonus} points</li>
									  </ul>

									  			<hr className="settings-horizontal" />

									<div className="settings-feature-request">
													Please email m.fennell@live.co.uk if you
										<ul>
											<li>Found a bug	</li>
											<li>Have a new idea for the site</li>
											<li>Have an issue with your account</li>
										</ul>
									  		</div>
								</div>
								: null}
							{this.state.lastClicked === 'team-name' ? <EditTeamName /> : null}
							{this.state.lastClicked === 'password' ? <EditPassword /> : null }
						</div>

					) : (
						<div className="outer-settings-columns">
							<div className="left-rows">
								<div className="settings-info-row">
									<div
										className="settings-wrapper"
										onClick={this.handlers.handleRules}
									>
										<div
											className="rules"
										>
											<div className="settings-header">
              										Settings
			  								</div>
			  							<ul>
										  <li>When the transfer window is open, you can make unlimited transfers</li>
										  <li>Goals</li>
										  <ul>
											  <li>Attacker: {rules.pointsPerAttackerGoal} points</li>
											  <li>Midfielder: {rules.pointsPerMidfielderGoal} points</li>
											  <li>Defender: {rules.pointsPerDefenderGoal} points</li>
										  </ul>
										  <li>Assists: {rules.pointsPerAssists} points</li>
										  <li>Clean Sheet: {rules.pointsPerCleanSheet} points</li>
										  <li>Yellow Card: {rules.pointsPerYellowCard} points</li>
										  <li>Red Card: {rules.pointsPerRedCard} points</li>
										  <li>Man of the Match: {rules.manOfTheMatchBonus} points</li>
									  </ul>

									  			<hr className="settings-horizontal" />

											<div className="settings-feature-request">
													Please email m.fennell@live.co.uk if you
												<ul>
													<li>Found a bug	</li>
													<li>Have a new idea for the site</li>
													<li>Have an issue with your account</li>
												</ul>
									  		</div>
										</div>

									</div>
									<div
										className="settings-wrapper"
										onClick={this.handlers.handleTeamName}
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
										onClick={this.handlers.handlePassword}
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
					)
				}
			</Media>

		);
	}
}
export default Settings;
