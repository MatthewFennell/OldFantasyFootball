import * as React from 'react';
import '../../Style/Team/Info.css';
import { DropdownItem, Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { getTeamForUserInWeek } from '../../Services/Player/PlayerService';
import { getTotalPointsById } from '../../Services/Points/PointsService';

interface StatsProps {
  weekBeingViewed: number;
  setWeekBeingViewed: (week: number) => void;
  setTeam: (team: PlayerDTO[]) => void;
  weeklyPointsCache: any;
  totalNumberOfWeeks: number;

  userBeingViewed: string
  totalPointsCache: { user: { id: string; points: number } }
  setTotalPointsCache: (user: string, points:number) => void;
}

interface InfoState {
  dropdownOpen: boolean;
}

class Info extends React.Component<StatsProps, InfoState> {
	constructor (props: StatsProps) {
		super(props);
		this._handleWeekChange = this._handleWeekChange.bind(this);
		this._toggle = this._toggle.bind(this);
		this.updateTotalPointsCache = this.updateTotalPointsCache.bind(this);
		this.state = {
			dropdownOpen: false
		};
	}

	componentDidUpdate (prevProps:any, prevState:any, snapshot:any) {
		if (prevProps.userBeingViewed !== this.props.userBeingViewed) {
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			console.log('NEW USER');
			this.updateTotalPointsCache();
		}
	}

	updateTotalPointsCache () {
		this.props.setTotalPointsCache(this.props.userBeingViewed, 5);
		getTotalPointsById(this.props.userBeingViewed).then(response => {
			this.props.setTotalPointsCache(this.props.userBeingViewed, response);
		}).catch(error => {
			console.log('error = ' + error);
		});
	}

	_handleWeekChange (week: number) {
		this.props.setWeekBeingViewed(week);
		getTeamForUserInWeek(week).then(response => {
			this.props.setTeam(response);
		});
	}

	_toggle () {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	}

	render () {
		console.log('total points cache = ' + JSON.stringify(this.props.totalPointsCache[this.props.userBeingViewed]));
		console.log('user being viewed = ' + this.props.userBeingViewed);
		let allWeeks: number[] = [];
		allWeeks.push(-1);
		for (let x = 0; x <= this.props.totalNumberOfWeeks; x++) {
			allWeeks.push(x);
		}

		const weekOptions = allWeeks.map(week => (
			<p
				className="team-menu-items"
				key={week}
			>
				<DropdownItem
					className={'week-menu-item-' + (week === this.props.weekBeingViewed)}
					key={week}
					onClick={() => this._handleWeekChange(week)}
					value={week}
				>
					{week === -1 ? 'Active Team' : 'Week ' + week}
				</DropdownItem>
			</p>
		));

		const { weekBeingViewed, weeklyPointsCache, } = this.props;
		const { dropdownOpen } = this.state;
		return (
			<div className="info-columns">
				<div className="total-points">Total Points: {this.props.totalPointsCache[this.props.userBeingViewed]}</div>

				<Dropdown
					isOpen={dropdownOpen}
					toggle={this._toggle}
				>
					{weekBeingViewed === -1
						? 'Active Team'
						: 'Week : ' + weekBeingViewed}
					<DropdownToggle
						caret
						className="week-menu-toggle"
					>
						{' '}
						{' ▼'}
					</DropdownToggle>
					<DropdownMenu className="week-menu">{weekOptions}</DropdownMenu>
				</Dropdown>
				<div className="week-points">Week points : {weeklyPointsCache[weekBeingViewed]}</div>
			</div>
		);
	}
}
export default Info;
