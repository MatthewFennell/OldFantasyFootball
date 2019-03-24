import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../Containers/Admin/SelectPlayer';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { AddPoints } from '../../Models/Interfaces/AddPoints';
import { addPlayerPoints } from '../../Services/Player/PlayerService';
import '../../Style/Admin/ErrorMessage.css';
import CustomDropdown from '../common/CustomDropdown';
import TextInputForm from '../common/TexInputForm';

interface AddPointsFormProps {
  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

interface AddPointsFormState {
  goals: string;
  assists: string;
  minutesPlayed: string;
  manOfTheMatch: boolean;
  yellowCards: string;
  cleanSheet: boolean;
  redCard: boolean;
  playerID: string;
  week: string;
  viewingDefender: boolean;
  pointsAdded: boolean;
  errorMessage: string;
}

class AddPointsForm extends React.Component<AddPointsFormProps, AddPointsFormState> {
	constructor (props: AddPointsFormProps) {
		super(props);
		this._handleGoals = this._handleGoals.bind(this);
		this._handleAssists = this._handleAssists.bind(this);
		this._handleMinutesPlayed = this._handleMinutesPlayed.bind(this);
		this._handleManOfTheMatch = this._handleManOfTheMatch.bind(this);
		this._handleYellowCards = this._handleYellowCards.bind(this);
		this._handleCleanSheet = this._handleCleanSheet.bind(this);
		this._handleRedCard = this._handleRedCard.bind(this);
		this._handlePlayerID = this._handlePlayerID.bind(this);
		this._handleWeek = this._handleWeek.bind(this);
		this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleOnValidate = this.handleOnValidate.bind(this);
		this.state = {
			goals: '',
			assists: '',
			minutesPlayed: '',
			manOfTheMatch: false,
			yellowCards: '0',
			cleanSheet: false,
			redCard: false,
			playerID: '',
			week: '',
			viewingDefender: true,
			pointsAdded: false,
			errorMessage: ''
		};
	}

	_handleGoals (goals: string) {
		this.setState({ goals });
	}

	_handlePlayerID (playerID: string) {
		this.setState({ playerID });
		let haveSet: boolean = false;
		const { playersInFilteredTeam } = this.props;

		for (let x = 0; x < playersInFilteredTeam.length; x++) {
			if (playerID === playersInFilteredTeam[x].id) {
				if (
					playersInFilteredTeam[x].position === 'DEFENDER' ||
          			playersInFilteredTeam[x].position === 'GOALKEEPER'
				) {
					haveSet = true;
					this.setState({ viewingDefender: true });
				}
			}
		}
		if (!haveSet) {
			this.setState({ viewingDefender: false });
			this.setState({ cleanSheet: false });
		}
	}

	_handleCollegeTeam (team: string) {
		this.props.setTeamAddingPoints(team);
	}

	_handleAssists (assists: string) {
		this.setState({ assists });
	}

	_handleMinutesPlayed (minutesPlayed: string) {
		this.setState({ minutesPlayed });
	}

	_handleManOfTheMatch (manOfTheMatch: boolean) {
		this.setState({ manOfTheMatch });
	}

	_handleYellowCards (yellowCards: string) {
		this.setState({ yellowCards });
	}

	_handleCleanSheet (cleanSheet: boolean) {
		this.setState({ cleanSheet });
	}

	_handleRedCard (redCard: boolean) {
		this.setState({ redCard });
	}

	_handleWeek (week: string) {
		this.setState({ week });
	}

	handleOnValidate () {
		let error: boolean = false;
		let message: string = 'Please select a value for : ';

		const { playerID, week, goals, assists, minutesPlayed } = this.state;

		if (playerID === '') {
			error = true;
			message += 'Player, ';
		}
		if (week === '' || isNaN(parseFloat(week))) {
			error = true;
			message += 'Week, ';
		}
		if (goals === '' || isNaN(parseFloat(goals))) {
			error = true;
			message += 'Goals, ';
		}
		if (assists === '' || isNaN(parseFloat(assists))) {
			error = true;
			message += 'Assists, ';
		}
		if (minutesPlayed === '' || isNaN(parseFloat(minutesPlayed))) {
			error = true;
			message += 'Minutes Played, ';
		}

		if (error) {
			this.setState({ errorMessage: message.substring(0, message.length - 2) });
			this.setState({ pointsAdded: false });
			setTimeout(this._removeErrorMessage, 10000);
		} else {
			this._onSubmit();
		}
	}

	_onSubmit () {
		const { goals, assists, minutesPlayed, manOfTheMatch, yellowCards, cleanSheet, redCard, playerID, week } = this.state;

		let data: AddPoints = {
			goals: goals,
			assists: assists,
			minutesPlayed: minutesPlayed,
			manOfTheMatch: manOfTheMatch,
			yellowCards: yellowCards,
			cleanSheet: cleanSheet,
			redCard: redCard,
			playerID: playerID,
			week: week
		};

		addPlayerPoints(data)
			.then(response => {
				this.setState({ pointsAdded: true });
				this.setState({ errorMessage: '' });
				setTimeout(this._removeErrorMessage, 10000);
			})
			.catch(error => {
				this.setState({ errorMessage: error });
				this.setState({ pointsAdded: false });
				setTimeout(this._removeErrorMessage, 10000);
			});
	}

	_removeErrorMessage () {
		this.setState({ pointsAdded: false });
		this.setState({ errorMessage: '' });
	}

	render () {
		let setTeam = this._handleCollegeTeam;
		let setPlayerID = this._handlePlayerID;

		const { viewingDefender, pointsAdded, errorMessage, week, goals, assists, minutesPlayed } = this.state;

		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<CollegeTeam setTeam={setTeam} />
					<SelectPlayer setPlayerID={setPlayerID} />
					<TextInputForm
						currentValue={week}
						setValue={this._handleWeek}
						title="Week"
					/>
				</div>
				<div className="admin-form-row-two">
					<TextInputForm
						currentValue={goals}
						setValue={this._handleGoals}
						title="Goals"
					/>
					<TextInputForm
						currentValue={assists}
						setValue={this._handleAssists}
						title="Assists"
					/>
					<TextInputForm
						currentValue={minutesPlayed}
						setValue={this._handleMinutesPlayed}
						title="Minutes played"
					/>
					<CustomDropdown
						setData={this._handleYellowCards}
						title="Yellow Cards"
						values={['0', '1', '2']}
					/>
					<CustomDropdown
						setData={this._handleManOfTheMatch}
						title="Man of the Match"
						values={['No', 'Yes']}
					/>
					<CustomDropdown
						setData={this._handleRedCard}
						title="Red Card"
						values={['No', 'Yes']}
					/>

					{viewingDefender ? (
						<CustomDropdown
							setData={this._handleCleanSheet}
							title="Clean Sheet"
							values={['No', 'Yes']}
						/>
					) : null}
				</div>
				<div>
					<Button
						className="btn btn-default btn-round-lg btn-lg second"
						id="btnAddPoints"
						onClick={this.handleOnValidate}
					>
            Add Points
					</Button>
				</div>
				{pointsAdded ? (
					<div className="error-message-animation"> Points added successfully </div>
				) : null}
				{errorMessage.length > 0 ? (
					<div className="error-message-animation"> Error : {errorMessage} </div>
				) : null}
			</div>
		);
	}
}
export default AddPointsForm;
