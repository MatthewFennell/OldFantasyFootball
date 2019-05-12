/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { getStats } from '../../Services/Player/PlayerService';
import { SingleHistory } from '../../Models/Interfaces/SingleHistory';
import { TeamHistory } from '../../Models/Interfaces/TeamHistory';
import '../../Style/Stats/Stats.css';
import TeamStats from './TeamStats';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import Media from 'react-media';
import { CollegeTeam } from '../../Models/Interfaces/CollegeTeam';
import CustomDropdown from '../common/CustomDropdown';
import TeamData from '../../Containers/Team/TeamData';

interface SettingsProps {
    setStatsHistory: (week:number, statsHistory: SingleHistory) => void;
    statsHistory: TeamHistory[][];
		totalNumberOfWeeks: number;
		allCollegeTeams: CollegeTeam[];
}

interface SettingsState {
		week: number;
		dropdownOpen: boolean;
		collegeTeam: string;
  }

class Settings extends React.Component<SettingsProps, SettingsState> {
	constructor (props: SettingsProps) {
		super(props);
		this._handleWeek = this._handleWeek.bind(this);
		this.generateColumns = this.generateColumns.bind(this);
		this._selectedOrNot = this._selectedOrNot.bind(this);
		this._toggle = this._toggle.bind(this);
		this.setCollegeTeam = this.setCollegeTeam.bind(this);
		this.generateFilteredColumns = this.generateFilteredColumns.bind(this);
		this.state = {
			week: -1,
			dropdownOpen: false,
			collegeTeam: 'All'
		};
		this.getHistory(this.state.week);
	}
	getHistory (week: number) {
		console.log('given week ' + week);
		console.log('previous stats = ' + JSON.stringify(this.props.statsHistory[week]));
		if (!this.props.statsHistory[week]) {
			getStats(week).then(response => {
				this.props.setStatsHistory(week, response);
			})
				.catch(error => {
					console.log('error = ' + error);
				});
		}
	}

	_toggle () {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	setCollegeTeam (collegeTeam: string) {
		this.setState({ collegeTeam });
	}

	_handleWeek (week: number) {
		if (week <= this.props.totalNumberOfWeeks) {
			this.setState({ week });
			this.getHistory(week);
		}
	}

	generateFilteredColumns () {
		let teamStats:JSX.Element[] = [];
		if (this.props.statsHistory[this.state.week]) {
			if (this.state.collegeTeam === 'All') {
				this.props.statsHistory[this.state.week].map(team => {
					teamStats.push(<TeamStats
						assists={team.assists}
						goalScorers={team.goalScorers}
						key={team.teamName}
						teamName={team.teamName}
					               />);
				});
			} else {
				this.props.statsHistory[this.state.week].filter(team => team.teamName === this.state.collegeTeam).map(team => {
					teamStats.push(<TeamStats
						assists={team.assists}
						goalScorers={team.goalScorers}
						key={team.teamName}
						teamName={team.teamName}
					               />);
				});
			}
		}
		return teamStats;
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

		let allWeeks: number[] = [];
		allWeeks.push(-1);
		for (let x = 1; x <= this.props.totalNumberOfWeeks; x++) {
			allWeeks.push(x);
		}

		const weekOptions = allWeeks.map(week => (
			<p
				className="team-menu-items"
				key={week}
			>
				<DropdownItem
					className={'week-menu-item-' + (week === this.state.week)}
					key={week}
					onClick={() => this._handleWeek(week)}
					value={week}
				>
					{week === -1 ? 'All weeks' : 'Week ' + week}
				</DropdownItem>
			</p>
		));

		return (

			<Media query="(max-width: 599px)">
				{matches =>
					matches ? (
						<div className="stats-mobile-wrapper">
							<TeamData />
							<div className="stats-title">
								Stats
							</div>
							<div className="stats-week-dropdown">
								<Dropdown
									isOpen={this.state.dropdownOpen}
									toggle={this._toggle}
								>
									{this.state.week === -1
										? 'All weeks'
										: 'Week : ' + this.state.week}
									<DropdownToggle
										caret
										className="week-menu-toggle"
									>
										{' '}
										{' ▼'}
									</DropdownToggle>
									<DropdownMenu className="week-menu">{weekOptions}</DropdownMenu>
								</Dropdown>
							</div>

							<div className="stats-college-dropdown">
								<CustomDropdown
									setData={this.setCollegeTeam}
									title="Team"
									values={['All'].concat(this.props.allCollegeTeams.map(team => team.name))}
								/>
							</div>
							<div className="team-histories">
								{this.generateFilteredColumns()}
							</div>
						</div>
					) : (
						<div className="stats-wrapper">
							<TeamData />
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
					)
				}
			</Media>

		);
	}
}
export default Settings;
