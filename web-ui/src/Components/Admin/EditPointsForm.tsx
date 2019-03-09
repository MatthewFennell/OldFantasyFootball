import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../Containers/Admin/SelectPlayer';
import { PlayerDTO } from '../../Models/Interfaces/Player';
import { PlayerPoints } from '../../Models/Interfaces/PlayerPoints';
import { AddPoints } from '../../Models/Interfaces/AddPoints';
import { editPlayerPoints, getPlayerStatsForWeek } from '../../Services/Player/PlayerService';
import '../../Style/Admin/ErrorMessage.css';
import TextInputForm from '../common/TexInputForm';
import CustomDropdown from '../common/CustomDropdown';

interface EditPointsFormProps {
  setTeamAddingPoints: (team: string) => void;
  teamAddingPoints: string;
  playersInFilteredTeam: PlayerDTO[];
}

interface EditPointsFormState {
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
  playerName: string;
  playerStats: PlayerPoints;
  pointsEdited: boolean;
  errorMessage: string;
}

class EditPointsForm extends React.Component<EditPointsFormProps, EditPointsFormState> {
	constructor (props: EditPointsFormProps) {
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
		this._getResults = this._getResults.bind(this);
		this._handleCollegeTeam = this._handleCollegeTeam.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this.handleValidate = this.handleValidate.bind(this);
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
			playerName: '',
			playerStats: {
				goals: 0,
				assists: 0,
				minutesPlayed: 0,
				manOfTheMatch: false,
				redCard: false,
				yellowCards: 0,
				cleanSheet: false,
				playerID: 'nobody',
				week: 0
			},
			pointsEdited: false,
			errorMessage: ''
		};
	}

	_removeErrorMessage () {
		this.setState({ pointsEdited: false });
		this.setState({ errorMessage: '' });
	}

	_getResults () {
		const { playerID, week } = this.state;
		if (playerID !== '' && week !== '') {
			getPlayerStatsForWeek(parseInt(week), playerID)
				.then(response => {
					this.setState({ playerStats: response });
				})
				.catch(error => {
					console.log(error);
					this.setState({
						playerStats: {
							goals: 0,
							assists: 0,
							minutesPlayed: 0,
							manOfTheMatch: false,
							redCard: false,
							yellowCards: 0,
							cleanSheet: false,
							playerID: 'nobody',
							week: 0
						}
					});
				});
		}
	}

	_handleGoals (goals: string) {
		this.setState({ goals });
	}

	_handlePlayerID (playerID: string) {
		const { playersInFilteredTeam } = this.props;
		this.setState({ playerID }, this._getResults);
		let haveSet: boolean = false;
		for (let x = 0; x < playersInFilteredTeam.length; x++) {
			if (playerID === playersInFilteredTeam[x].id) {
				this.setState(
					{
						playerName:
              playersInFilteredTeam[x].firstName +
              ' ' +
              playersInFilteredTeam[x].surname
					},
					this._getResults
				);
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
		const { setTeamAddingPoints } = this.props;
		setTeamAddingPoints(team);
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
		this.setState({ week }, this._getResults);
	}

	handleValidate () {
		const { playerID, week, goals, assists, minutesPlayed } = this.state;
		let error: boolean = false;
		let message: string = 'Please select a value for : ';

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
			this.setState({ pointsEdited: false });
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

		editPlayerPoints(data)
			.then(response => {
				this.setState({ pointsEdited: true });
				this.setState({ errorMessage: '' });
				setTimeout(this._removeErrorMessage, 10000);
			})
			.catch(error => {
				this.setState({ errorMessage: error });
				this.setState({ pointsEdited: false });
				setTimeout(this._removeErrorMessage, 10000);
			});
	}

	render () {
		const { week, playerID, playerName, playerStats, goals, assists, minutesPlayed, viewingDefender, pointsEdited, errorMessage } = this.state;
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<CollegeTeam setTeam={this._handleCollegeTeam} />
					<SelectPlayer setPlayerID={this._handlePlayerID} />
					<TextInputForm
						currentValue={week}
						setValue={this._handleWeek}
						title="Week"
					/>
				</div>
				<div className="admin-form-row-two">
					{playerID !== '' && week !== '' ? (
						<div className="edit-points-info">
              Stats for player {playerName} in week {week}
						</div>
					) : null}
				</div>
				<div className="admin-form-row-two">
					<div className="edit-points-info">
            Goals:
						{playerStats.playerID !== 'nobody' ? playerStats.goals : null}
					</div>
					<div className="edit-points-info">
            Assists:
						{playerStats.playerID !== 'nobody' ? playerStats.assists : null}
					</div>
					<div className="edit-points-info">
            Minutes Played:
						{playerStats.playerID !== 'nobody'
							? playerStats.minutesPlayed
							: null}
					</div>
					<div className="edit-points-info">
            Yellow Cards:
						{playerStats.playerID !== 'nobody'
							? playerStats.yellowCards
							: null}
					</div>
					<div className="edit-points-info">
            Man of the Match:
						{playerStats.playerID !== 'nobody' ? (
							playerStats.manOfTheMatch ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)
						) : null}
					</div>
					<div className="edit-points-info">
            Red Card:
						{playerStats.playerID !== 'nobody' ? (
							playerStats.redCard ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)
						) : null}
					</div>

					{viewingDefender ? (
						<div className="edit-points-info">
              Clean Sheet:
							{playerStats.playerID !== 'nobody' ? (
								playerStats.cleanSheet ? (
									<p>Yes</p>
								) : (
									<p>No</p>
								)
							) : null}
						</div>
					) : null}
				</div>
				<div className="admin-form-row-two">
					{playerID !== '' && week !== '' ? (
						<div className="edit-points-info">Edit their stats below</div>
					) : null}
				</div>

				<div className="admin-form-row-two">
					{playerID !== '' && week !== '' ? (
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

							{viewingDefender ? <CustomDropdown
								setData={this._handleCleanSheet}
								title="Clean Sheet"
								values={['No', 'Yes']}
							                   /> : null}
						</div>
					) : null}
				</div>

				<div>
					<Button
						className="btn btn-default btn-round-lg btn-lg second"
						id="btnEditPoints"
						onClick={this.handleValidate}
					>
            Edit Points
					</Button>
				</div>
				{pointsEdited ? (
					<div className="error-message-animation">Points edited successfully! </div>
				) : null}
				{errorMessage ? (
					<div className="error-message-animation">Error : {errorMessage} </div>
				) : null}
			</div>
		);
	}
}
export default EditPointsForm;
