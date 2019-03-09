import * as React from 'react';
import { Button } from 'reactstrap';
import CollegeTeam from '../../../Containers/Admin/AddPointsCollegeTeam';
import SelectPlayer from '../../../Containers/Admin/SelectPlayer';
import { PlayerDTO } from '../../../Models/Interfaces/Player';
import { PlayerPoints } from '../../../Models/Interfaces/PlayerPoints';
import { AddPoints } from '../../../Models/Interfaces/AddPoints';
import { editPlayerPoints, getPlayerStatsForWeek } from '../../../Services/Player/PlayerService';
import '../../../Style/Admin/ErrorMessage.css';
import TextInputForm from '../../common/TexInputForm';
import CustomDropdown from '../../common/CustomDropdown';

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
		this._onValidate = this._onValidate.bind(this);
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
		if (this.state.playerID !== '' && this.state.week !== '') {
			getPlayerStatsForWeek(parseInt(this.state.week), this.state.playerID)
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
		this.setState({ playerID }, this._getResults);
		let haveSet: boolean = false;
		for (let x = 0; x < this.props.playersInFilteredTeam.length; x++) {
			if (playerID === this.props.playersInFilteredTeam[x].id) {
				this.setState(
					{
						playerName:
              this.props.playersInFilteredTeam[x].firstName +
              ' ' +
              this.props.playersInFilteredTeam[x].surname
					},
					this._getResults
				);
				if (
					this.props.playersInFilteredTeam[x].position === 'DEFENDER' ||
          this.props.playersInFilteredTeam[x].position === 'GOALKEEPER'
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
		this.setState({ week }, this._getResults);
	}

	_onValidate () {
		let error: boolean = false;
		let message: string = 'Please select a value for : ';

		if (this.state.playerID === '') {
			error = true;
			message += 'Player, ';
		}
		if (this.state.week === '' || isNaN(parseFloat(this.state.week))) {
			error = true;
			message += 'Week, ';
		}
		if (this.state.goals === '' || isNaN(parseFloat(this.state.goals))) {
			error = true;
			message += 'Goals, ';
		}
		if (this.state.assists === '' || isNaN(parseFloat(this.state.assists))) {
			error = true;
			message += 'Assists, ';
		}
		if (this.state.minutesPlayed === '' || isNaN(parseFloat(this.state.minutesPlayed))) {
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
		let data: AddPoints = {
			goals: this.state.goals,
			assists: this.state.assists,
			minutesPlayed: this.state.minutesPlayed,
			manOfTheMatch: this.state.manOfTheMatch,
			yellowCards: this.state.yellowCards,
			cleanSheet: this.state.cleanSheet,
			redCard: this.state.redCard,
			playerID: this.state.playerID,
			week: this.state.week
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
		let setTeam = this._handleCollegeTeam;
		let setPlayerID = this._handlePlayerID;

		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<CollegeTeam setTeam={setTeam} />
					<SelectPlayer setPlayerID={setPlayerID} />
					<TextInputForm
						currentValue={this.state.week}
						setValue={this._handleWeek}
						title="Week"
					/>
				</div>
				<div className="admin-form-row-two">
					{this.state.playerID !== '' && this.state.week !== '' ? (
						<div className="edit-points-info">
              Stats for player {this.state.playerName} in week {this.state.week}
						</div>
					) : null}
				</div>
				<div className="admin-form-row-two">
					<div className="edit-points-info">
            Goals:
						{this.state.playerStats.playerID !== 'nobody' ? this.state.playerStats.goals : null}
					</div>
					<div className="edit-points-info">
            Assists:
						{this.state.playerStats.playerID !== 'nobody' ? this.state.playerStats.assists : null}
					</div>
					<div className="edit-points-info">
            Minutes Played:
						{this.state.playerStats.playerID !== 'nobody'
							? this.state.playerStats.minutesPlayed
							: null}
					</div>
					<div className="edit-points-info">
            Yellow Cards:
						{this.state.playerStats.playerID !== 'nobody'
							? this.state.playerStats.yellowCards
							: null}
					</div>
					<div className="edit-points-info">
            Man of the Match:
						{this.state.playerStats.playerID !== 'nobody' ? (
							this.state.playerStats.manOfTheMatch ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)
						) : null}
					</div>
					<div className="edit-points-info">
            Red Card:
						{this.state.playerStats.playerID !== 'nobody' ? (
							this.state.playerStats.redCard ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)
						) : null}
					</div>

					{this.state.viewingDefender ? (
						<div className="edit-points-info">
              Clean Sheet:
							{this.state.playerStats.playerID !== 'nobody' ? (
								this.state.playerStats.cleanSheet ? (
									<p>Yes</p>
								) : (
									<p>No</p>
								)
							) : null}
						</div>
					) : null}
				</div>
				<div className="admin-form-row-two">
					{this.state.playerID !== '' && this.state.week !== '' ? (
						<div className="edit-points-info">Edit their stats below</div>
					) : null}
				</div>

				<div className="admin-form-row-two">
					{this.state.playerID !== '' && this.state.week !== '' ? (
						<div className="admin-form-row-two">
							<TextInputForm
								currentValue={this.state.goals}
								setValue={this._handleGoals}
								title="Goals"
							/>
							<TextInputForm
								currentValue={this.state.assists}
								setValue={this._handleAssists}
								title="Assists"
							/>
							<TextInputForm
								currentValue={this.state.minutesPlayed}
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

							{this.state.viewingDefender ? <CustomDropdown
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
						onClick={() => this._onValidate()}
					>
            Edit Points
					</Button>
				</div>
				{this.state.pointsEdited ? (
					<div className="error-message-animation">Points edited successfully! </div>
				) : null}
				{this.state.errorMessage ? (
					<div className="error-message-animation">Error : {this.state.errorMessage} </div>
				) : null}
			</div>
		);
	}
}
export default EditPointsForm;
