import * as React from 'react';
import { getStats } from '../../Services/Player/PlayerService';
import { SingleHistory } from '../../Models/Interfaces/SingleHistory';
import { TeamHistory } from '../../Models/Interfaces/TeamHistory';
import CustomDropdown from '../common/CustomDropdown';
import '../../Style/Stats/Stats.css';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import { CollegeTeam as CT } from '../../Models/Interfaces/CollegeTeam';
import TeamStats from './TeamStats';

interface SettingsProps {
	  allCollegeTeams: CT[];

    setStatsHistory: (week:number, statsHistory: SingleHistory) => void;
    statsHistory: TeamHistory[][];
    totalNumberOfWeeks: number;
}

interface SettingsState {
		week: number;
		collegeName: string;
  }

class Settings extends React.Component<SettingsProps, SettingsState> {
	constructor (props: SettingsProps) {
		super(props);
		this._handleWeek = this._handleWeek.bind(this);
		this._handleCollegeName = this._handleCollegeName.bind(this);
		const { allCollegeTeams } = this.props;
		this.state = {
			week: this.props.totalNumberOfWeeks,
			collegeName: allCollegeTeams.length > 0 ? allCollegeTeams[0].name : ''
		};
		this.getHistory(this.state.week);
	}
	getHistory (week: number) {
		if (!this.props.statsHistory[week]) {
			getStats(week).then(response => {
				this.props.setStatsHistory(week, response);
				this.props.setStatsHistory(1, response);
				this.props.setStatsHistory(2, response);
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

	_handleCollegeName (collegeName: string) {
		this.setState({ collegeName });
	}

	render () {
		let currentHistory = this.props.statsHistory[this.state.week];
		if (currentHistory) {
			let p = currentHistory.find(a => a.teamName === this.state.collegeName);
			console.log('p = ' + JSON.stringify(p));
		}

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

					<div className="stats-team-selector">
						<CollegeTeam setTeam={this._handleCollegeName} />
					</div>
				</div>

				<div className="all-team-stats-wrapper">

					{this.props.statsHistory[this.state.week]

						? this.props.statsHistory[this.state.week].map(team => (
							<TeamStats
								assists={team.assists}
								goalScorers={team.goalScorers}
								key="a"
								teamName={team.teamName}
							/>))
						: null}
				</div>
			</div>
		);
	}
}
export default Settings;
