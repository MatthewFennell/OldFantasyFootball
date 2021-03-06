import * as React from 'react';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import { Button } from 'reactstrap';
import SelectPlayer from '../../Containers/Admin/SelectPlayer';
import { SubmitResults } from '../../Models/Interfaces/SubmitResults';
import { submitResult } from '../../Services/Player/PlayerService';
import '../../Style/Admin/ErrorMessage.css';
import TextInputForm from '../common/TexInputForm';
import { CollegeTeam as CT } from '../../Models/Interfaces/CollegeTeam';
import ResponseMessage from '../common/ResponseMessage';
import CustomDropdown from '../common/CustomDropdown';
import LoadingSpinner from '../common/LoadingSpinner';

interface AddResultProps {
  setTeamAddingPoints: (team: string) => void;
  allCollegeTeams: CT[];
  collegeTeamName: string;
  totalNumberOfWeeks: number;
}

interface AddResultState {
  goalsFor: string;
  goalsAgainst: string;
  week: string;
  playerIDGoals: string[];
  playerIDAssists: string[];
  playerIDCleanSheets: string[];
  teamName: string;
  responseMessage: string;
  isError: boolean;
  manOfTheMatch: string;
  isLoading: boolean;
}

class AddResult extends React.Component<AddResultProps, AddResultState> {
	constructor (props: AddResultProps) {
		super(props);
		this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
		this._handleGoalsFor = this._handleGoalsFor.bind(this);
		this._handleGoalsAgainst = this._handleGoalsAgainst.bind(this);
		this._handleWeek = this._handleWeek.bind(this);
		this._handlePlayerIDGoalscorers = this._handlePlayerIDGoalscorers.bind(this);
		this._handlePlayerIDAssists = this._handlePlayerIDAssists.bind(this);
		this._handlePlayerIDCleanSheets = this._handlePlayerIDCleanSheets.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleOnValidate = this.handleOnValidate.bind(this);
		this._handleManOfTheMatch = this._handleManOfTheMatch.bind(this);
		const collegeName = this.props.allCollegeTeams.length > 0 ? this.props.allCollegeTeams[0].name : '';
		this.state = {
			goalsFor: '',
			goalsAgainst: '',
			week: props.totalNumberOfWeeks.toString(),
			playerIDGoals: [],
			playerIDAssists: [],
			playerIDCleanSheets: [],
			teamName: this.props.collegeTeamName === '' ? collegeName : this.props.collegeTeamName,
			responseMessage: '',
			isError: false,
			manOfTheMatch: '',
			isLoading: false
		};
	}

	_handlePlayerIDGoalscorers (playerID: string, previousID: string) {
		const { playerIDGoals } = this.state;
		let newState: string[] = playerIDGoals.filter(value => {
			return value !== previousID;
		});
		newState.push(playerID);
		this.setState({ playerIDGoals: newState });
	}

	_handlePlayerIDAssists (playerID: string, previousID: string) {
		const { playerIDAssists } = this.state;
		let newState: string[] = playerIDAssists.filter(value => {
			return value !== previousID;
		});
		newState.push(playerID);
		this.setState({ playerIDAssists: newState });
	}

	_handlePlayerIDCleanSheets (playerID: string, previousID: string) {
		const { playerIDCleanSheets } = this.state;
		let newState: string[] = playerIDCleanSheets.filter(value => {
			return value !== previousID;
		});
		newState.push(playerID);
		this.setState({ playerIDCleanSheets: newState });
	}

	_handleCollegeTeam (teamName: string) {
		this.props.setTeamAddingPoints(teamName);
		this.setState({ teamName, goalsFor: '', goalsAgainst: '' });
	}

	_handleGoalsFor (goalsFor: string) {
		this.setState({ goalsFor });
	}

	_handleGoalsAgainst (goalsAgainst: string) {
		this.setState({ goalsAgainst });
	}

	_handleManOfTheMatch (manOfTheMatch: string) {
		this.setState({ manOfTheMatch });
	}

	_handleWeek (week: string) {
		this.setState({ week });
	}

	handleOnValidate () {
		const { week, goalsFor, goalsAgainst, manOfTheMatch } = this.state;
		let error: boolean = false;
		let message: string = 'Please select a value for ';
		if (week === '' || isNaN(parseFloat(week))) {
			error = true;
			message += 'Week, ';
		}
		if (goalsFor === '' || isNaN(parseFloat(goalsFor))) {
			error = true;
			message += 'Goals for, ';
		}
		if (goalsAgainst === '' || isNaN(parseFloat(goalsAgainst))) {
			error = true;
			message += 'Goals against, ';
		}
		if (manOfTheMatch === '') {
			error = true;
			message += 'Man of the match, ';
		}

		if (error) {
			this.setState({ responseMessage: message.substring(0, message.length - 2), isError: true });
		} else {
			this._onSubmit();
		}
	}

	_onSubmit () {
		const { goalsFor, goalsAgainst, week, playerIDGoals, playerIDAssists, playerIDCleanSheets, teamName } = this.state;
		let data: SubmitResults = {
			goalsFor: parseInt(goalsFor),
			goalsAgainst: parseInt(goalsAgainst),
			week: parseInt(week),
			goalScorers: playerIDGoals,
			assists: playerIDAssists,
			cleanSheets: playerIDCleanSheets,
			teamName: teamName,
			manOfTheMatch: this.state.manOfTheMatch
		};
		this.setState({ isLoading: true });
		submitResult(data).then(response => {
			this.setState({ isError: false, responseMessage: 'Result added successfully', isLoading: false });
		}).catch(error => {
			this.setState({ isError: true, responseMessage: error, isLoading: false });
		});
	}

	render () {
		const { goalsFor, goalsAgainst } = this.state;
		let goalScorers = [];
		let assists = [];
		let defenders = [];
		for (let i = 0; i < parseInt(goalsFor); i++) {
			goalScorers.push(<SelectPlayer
				key={i}
				setPlayerID={this._handlePlayerIDGoalscorers}
			                 />);
			assists.push(<SelectPlayer
				key={i}
				setPlayerID={this._handlePlayerIDAssists}
			             />);
		}

		if (goalsAgainst === '0') {
			for (let i = 0; i < 7; i++) {
				defenders.push(<SelectPlayer
					onlyDefenders
					setPlayerID={this._handlePlayerIDCleanSheets}
				               />);
			}
		}

		let allWeeks: number[] = [];
		for (let x = 1; x <= this.props.totalNumberOfWeeks; x++) {
			allWeeks.push(x);
		}

		return (
			<div className="admin-form">
				<div className="admin-form-row-one">

					{this.props.collegeTeamName === '' ? <div className="admin-wrapper">
						<CollegeTeam setTeam={this._handleCollegeTeam} />
					</div> : null}

					<div className="admin-wrapper">
						<TextInputForm
							currentValue={goalsFor}
							setValue={this._handleGoalsFor}
							title="Goals for"
						/>
					</div>
					<div className="admin-wrapper">
						<TextInputForm
							currentValue={goalsAgainst}
							setValue={this._handleGoalsAgainst}
							title="Goals against"
						/>
					</div>
					<div className="admin-wrapper">
						<CustomDropdown
							setData={this._handleWeek}
							startAtEnd
							title="Week"
							values={allWeeks}
						/>
					</div>
				</div>
				<div className="admin-form-row-two">
					<div className="edit-points-info">
						<div className="addResultGoalscorers">Goalscorers</div>
						{goalScorers}
					</div>
					<div className="edit-points-info">
						<div className="addResultAssists">Assists</div>
						{assists}
					</div>
					{goalsAgainst === '0' ? (
						<div className="edit-points-info"><div className="addResultCleanSheet">Clean Sheets</div> {defenders} </div>
					) : null}
					<div className="edit-points-info">
						<div className="admin-man-of-the-match">
							<div className="addResultManOfTheMatch">Man of the Match</div>
						</div>
						{<SelectPlayer setPlayerID={this._handleManOfTheMatch} />}
					</div>
					<div className="submit-button-add-result">
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnAddResult"
							onClick={this.handleOnValidate}
						>
              Create result
						</Button>
						<ResponseMessage
							isError={this.state.isError}
							responseMessage={this.state.responseMessage}
							shouldDisplay={this.state.responseMessage.length > 0}
						/>
						<LoadingSpinner isLoading={this.state.isLoading} />
					</div>

				</div>

			</div>
		);
	}
}
export default AddResult;
