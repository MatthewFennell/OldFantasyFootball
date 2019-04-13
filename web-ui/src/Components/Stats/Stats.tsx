import * as React from 'react';
import { getStats } from '../../Services/Player/PlayerService';
import { SingleHistory } from '../../Models/Interfaces/SingleHistory';
import { TeamHistory } from '../../Models/Interfaces/TeamHistory';
import CustomDropdown from '../common/CustomDropdown';
import '../../Style/Stats/Stats.css';
import TeamStats from './TeamStats';

interface SettingsProps {
    setStatsHistory: (week:number, statsHistory: SingleHistory) => void;
    statsHistory: TeamHistory[][];
    totalNumberOfWeeks: number;
}

interface SettingsState {
		week: number;
  }

class Settings extends React.Component<SettingsProps, SettingsState> {
	constructor (props: SettingsProps) {
		super(props);
		this._handleWeek = this._handleWeek.bind(this);
		this.state = {
			week: this.props.totalNumberOfWeeks,
		};
		this.getHistory(this.state.week);
	}
	getHistory (week: number) {
		if (!this.props.statsHistory[week]) {
			getStats(week).then(response => {
				this.props.setStatsHistory(week, response);
			})
				.catch(error => {
					console.log('error = ' + error);
				});
		}
	}

	_handleWeek (week: number) {
		this.setState({ week });
		this.getHistory(week);
	}

	render () {
		return (
			<div className="stats-wrapper">

				<div className="stats-info-wrapper">
					<div className="stats-week-selector">
						<CustomDropdown
							setData={this._handleWeek}
							title="Week"
							values={[...Array(this.props.totalNumberOfWeeks + 1).keys()]}
						/>
					</div>
				</div>

				<div className="all-team-stats-wrapper">

					<div className="stats-history-columns">
						{this.props.statsHistory[this.state.week]

							? this.props.statsHistory[this.state.week].map((team, index) => (
								index < this.props.statsHistory[this.state.week].length / 3
									? <TeamStats
										assists={team.assists}
										goalScorers={team.goalScorers}
										key="a"
										teamName={team.teamName}
									  /> : null))
							: null}
					</div>

					<div className="stats-history-columns">
						{this.props.statsHistory[this.state.week]

							? this.props.statsHistory[this.state.week].map((team, index) => (
								index >= this.props.statsHistory[this.state.week].length / 3 && index < this.props.statsHistory[this.state.week].length * 2 / 3
									? <TeamStats
										assists={team.assists}
										goalScorers={team.goalScorers}
										key="a"
										teamName={team.teamName}
									  /> : null))
							: null}
					</div>

					<div className="stats-history-columns">
						{this.props.statsHistory[this.state.week]

							? this.props.statsHistory[this.state.week].map((team, index) => (
								index >= this.props.statsHistory[this.state.week].length * 2 / 3
									? <TeamStats
										assists={team.assists}
										goalScorers={team.goalScorers}
										key="a"
										teamName={team.teamName}
									  /> : null))
							: null}
					</div>
				</div>
			</div>
		);
	}
}
export default Settings;
