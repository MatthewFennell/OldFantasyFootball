/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { getStats } from '../../Services/Player/PlayerService';
import { SingleHistory } from '../../Models/Interfaces/SingleHistory';
import { TeamHistory } from '../../Models/Interfaces/TeamHistory';
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
		this.generateColumns = this.generateColumns.bind(this);
		this._selectedOrNot = this._selectedOrNot.bind(this);
		this.state = {
			week: -2,
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
		if (week <= this.props.totalNumberOfWeeks) {
			this.setState({ week });
			this.getHistory(week);
		}
	}

	generateColumns () {
		let columnOne:JSX.Element[] = [];
		let columnTwo:JSX.Element[] = [];
		let columnThree:JSX.Element[] = [];

		if (this.props.statsHistory[this.state.week]) {
			this.props.statsHistory[this.state.week].map((team, index) => {
				if (index % 3 === 0) {
					columnOne.push(<TeamStats
						assists={team.assists}
						goalScorers={team.goalScorers}
						key={team.teamName}
						teamName={team.teamName}
					               />);
				} else if (index % 3 === 1) {
					columnTwo.push(<TeamStats
						assists={team.assists}
						goalScorers={team.goalScorers}
						key={team.teamName}
						teamName={team.teamName}
					               />);
				} else {
					columnThree.push(<TeamStats
						assists={team.assists}
						goalScorers={team.goalScorers}
						key={team.teamName}
						teamName={team.teamName}
					                 />);
				}
			});
		}

		return [columnOne, columnTwo, columnThree];
	}

	_selectedOrNot (input: number) {
		if (input > this.props.totalNumberOfWeeks) {
			return 'week-unclickable';
		}
		return input === this.state.week ? 'raise-week-dev-selected' : 'raise-week-dev';
	}

	render () {
		let columns = this.generateColumns();
		let values = [...Array(this.props.totalNumberOfWeeks + 3).keys()];

		return (
			<div className="stats-wrapper">

				<div className="stats-week-wrapper">

					<div
						className={this._selectedOrNot(-1)}
						key="All"
						onClick={() => { this._handleWeek(-1); }}
					>
            	Week: All
					</div>

					{values.map(index => (
						<div
							className={this._selectedOrNot(index)}
							key={index}
							onClick={() => { this._handleWeek(index); }}
						>
            	Week: {index}
						</div>
					))}

				</div>

				<div className="all-team-stats-wrapper">

					<div className="stats-history-columns">
						{columns[0]}
					</div>

					<div className="stats-history-columns">
						{columns[1]}
					</div>

					<div className="stats-history-columns">
						{columns[2]}
					</div>
				</div>
			</div>
		);
	}
}
export default Settings;
