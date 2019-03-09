import * as React from 'react';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import { Button } from 'reactstrap';
import Goals from './Goals';
import Week from '../AddPoints/Week';
import SelectPlayer from '../../../Containers/Admin/SelectPlayer';
import { SubmitResults } from '../../../Models/Interfaces/SubmitResults';
import { submitResult } from '../../../Services/Player/PlayerService';
import '../../../Style/Admin/ErrorMessage.css';

interface TransfersFormProps {
  setTeamAddingPoints: (team: string) => void;
}

interface TransfersFormState {
  goalsFor: string;
  goalsAgainst: string;
  week: string;
  playerIDGoals: string[];
  playerIDAssists: string[];
  playerIDCleanSheets: string[];
  teamName: string;
  resultAdded: boolean;
  previousTeamName: string;
  previousWeek: string;
  errorMessage: string;
}

class TransfersForm extends React.Component<TransfersFormProps, TransfersFormState> {
	constructor (props: TransfersFormProps) {
		super(props);
		this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
		this._handleGoalsFor = this._handleGoalsFor.bind(this);
		this._handleGoalsAgainst = this._handleGoalsAgainst.bind(this);
		this._handleWeek = this._handleWeek.bind(this);
		this._handlePlayerIDGoalscorers = this._handlePlayerIDGoalscorers.bind(this);
		this._handlePlayerIDAssists = this._handlePlayerIDAssists.bind(this);
		this._handlePlayerIDCleanSheets = this._handlePlayerIDCleanSheets.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this._onValidate = this._onValidate.bind(this);
		this.state = {
			goalsFor: '',
			goalsAgainst: '',
			week: '',
			playerIDGoals: [],
			playerIDAssists: [],
			playerIDCleanSheets: [],
			teamName: 'A',
			resultAdded: false,
			previousTeamName: '',
			previousWeek: '',
			errorMessage: ''
		};
	}

	_handlePlayerIDGoalscorers (playerID: string, previousID: string) {
		let newState: string[] = [];
		for (let x = 0; x < this.state.playerIDGoals.length; x++) {
			if (this.state.playerIDGoals[x] !== previousID) {
				newState.push(this.state.playerIDGoals[x]);
			}
		}
		newState.push(playerID);
		this.setState({ playerIDGoals: newState });
	}

	_removeErrorMessage () {
		this.setState({ resultAdded: false });
		this.setState({ errorMessage: '' });
	}

	_handlePlayerIDAssists (playerID: string, previousID: string) {
		let newState: string[] = [];
		for (let x = 0; x < this.state.playerIDAssists.length; x++) {
			if (this.state.playerIDAssists[x] !== previousID) {
				newState.push(this.state.playerIDAssists[x]);
			}
		}
		newState.push(playerID);
		this.setState({ playerIDAssists: newState });
	}

	_handlePlayerIDCleanSheets (playerID: string, previousID: string) {
		let newState: string[] = [];
		for (let x = 0; x < this.state.playerIDCleanSheets.length; x++) {
			if (this.state.playerIDCleanSheets[x] !== previousID) {
				newState.push(this.state.playerIDCleanSheets[x]);
			}
		}
		newState.push(playerID);
		this.setState({ playerIDCleanSheets: newState });
	}

	_handleCollegeTeam (teamName: string) {
		this.props.setTeamAddingPoints(teamName);
		this.setState({ teamName });
	}

	_handleGoalsFor (goalsFor: string) {
		this.setState({ goalsFor });
	}

	_handleGoalsAgainst (goalsAgainst: string) {
		this.setState({ goalsAgainst });
	}

	_handleWeek (week: string) {
		this.setState({ week });
	}

	_onValidate () {
		let error: boolean = false;
		let message: string = 'Please select a value for ';
		if (this.state.week === '' || isNaN(parseFloat(this.state.week))) {
			error = true;
			message += 'Week, ';
		}
		if (this.state.goalsFor === '' || isNaN(parseFloat(this.state.goalsFor))) {
			error = true;
			message += 'Goals for, ';
		}
		if (this.state.goalsAgainst === '' || isNaN(parseFloat(this.state.goalsAgainst))) {
			error = true;
			message += 'Goals against, ';
		}

		if (error) {
			this.setState({ previousTeamName: '' });
			this.setState({ previousWeek: '' });
			this.setState({ errorMessage: message.substring(0, message.length - 2) });
			setTimeout(this._removeErrorMessage, 10000);
		} else {
			this._onSubmit();
		}
	}

	_onSubmit () {
		let data: SubmitResults = {
			goalsFor: parseInt(this.state.goalsFor),
			goalsAgainst: parseInt(this.state.goalsAgainst),
			week: parseInt(this.state.week),
			goalScorers: this.state.playerIDGoals,
			assists: this.state.playerIDAssists,
			cleanSheets: this.state.playerIDCleanSheets,
			teamName: this.state.teamName
		};

		submitResult(data).then(response => {
			this.setState({ resultAdded: true });
			this.setState({ previousTeamName: this.state.teamName });
			this.setState({ previousWeek: this.state.week });
			this.setState({ errorMessage: '' });
			setTimeout(this._removeErrorMessage, 10000);
		});
	}

	render () {
		let teamChange = this._handleCollegeTeam;
		let goalsFor = this._handleGoalsFor;
		let setWeek = this._handleWeek;
		let goalsAgainst = this._handleGoalsAgainst;
		let setPlayerIDGoalscorers = this._handlePlayerIDGoalscorers;
		let setPlayerIDAssists = this._handlePlayerIDAssists;
		let setPlayerIDCleanSheets = this._handlePlayerIDCleanSheets;

		let goalScorers = [];
		let assists = [];
		let defenders = [];
		for (let i = 0; i < parseInt(this.state.goalsFor); i++) {
			goalScorers.push(<SelectPlayer setPlayerID={setPlayerIDGoalscorers} />);
			assists.push(<SelectPlayer setPlayerID={setPlayerIDAssists} />);
		}

		if (this.state.goalsAgainst === '0') {
			for (let i = 0; i < 7; i++) {
				defenders.push(<SelectPlayer
					onlyDefenders
					setPlayerID={setPlayerIDCleanSheets}
				               />);
			}
		}

		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<CollegeTeam setTeam={teamChange} />
					<Goals
						goals={goalsFor}
						wording="for"
					/>
					<Goals
						goals={goalsAgainst}
						wording="against"
					/>
					<Week week={setWeek} />
				</div>
				<div className="admin-form-row-two">
					<div className="edit-points-info">
            Goalscorers:
						{goalScorers}
					</div>
					<div className="edit-points-info">
            Assists:
						{assists}
					</div>
					{this.state.goalsAgainst === '0' ? (
						<div className="edit-points-info">Clean Sheets: {defenders} </div>
					) : null}
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnAddResult"
							onClick={() => this._onValidate()}
						>
              Create result
						</Button>
					</div>
				</div>
				{this.state.resultAdded ? (
					<div className="error-message-animation">
            Result added to team {this.state.previousTeamName} in week {this.state.previousWeek}
					</div>
				) : null}

				{this.state.errorMessage.length > 0 ? (
					<div className="error-message-animation">Error : {this.state.errorMessage}</div>
				) : null}
			</div>
		);
	}
}
export default TransfersForm;
