import * as React from 'react';
import { createPlayer } from '../../Services/Player/PlayerService';
import { CreatePlayer } from '../../Models/Interfaces/CreatePlayer';
import CollegeTeam from '../../Containers/Admin/AddPointsCollegeTeam';
import { Button } from 'reactstrap';
import { CollegeTeam as CT } from '../../Models/Interfaces/CollegeTeam';
import '../../Style/Admin/ErrorMessage.css';
import { validPlayerFirstName, validPlayerSurname } from '../../Services/CredentialInputService';
import '../../Style/Admin/CreatePlayerForm.css';
import CustomDropdown from '../common/CustomDropdown';

import TextInputForm from '../common/TexInputForm';

interface CreatePlayerProps {
  allCollegeTeams: CT[];
}

interface CreatePlayerState {
  positionValue: string;
  teamValue: string;
  firstNameValue: string;
  surnameValue: string;
  priceValue: string;
  playerCreated: boolean;
  previousValues: string[];
  errorMessage: string;
}

class CreatePlayerForm extends React.Component<CreatePlayerProps, CreatePlayerState> {
	constructor (props: CreatePlayerProps) {
		super(props);
		this._handlePositionChange = this._handlePositionChange.bind(this);
		this._handleTeamChange = this._handleTeamChange.bind(this);
		this._handleSurname = this._handleSurname.bind(this);
		this._handleFirstName = this._handleFirstName.bind(this);
		this._handlePrice = this._handlePrice.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
		this._onValidate = this._onValidate.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);
		if (this.props.allCollegeTeams.length > 0) {
			this.state = {
				positionValue: 'Goalkeeper',
				teamValue: this.props.allCollegeTeams[0].name,
				firstNameValue: '',
				surnameValue: '',
				priceValue: '',
				playerCreated: false,
				previousValues: [],
				errorMessage: ''
			};
		} else {
			this.state = {
				positionValue: 'Goalkeeper',
				teamValue: 'No player selected',
				firstNameValue: '',
				surnameValue: '',
				priceValue: '',
				playerCreated: false,
				previousValues: [],
				errorMessage: ''
			};
		}
	}

	_removeErrorMessage () {
		this.setState({ playerCreated: false });
		this.setState({ errorMessage: '' });
	}

	_handlePositionChange (position: string) {
		this.setState({ positionValue: position });
	}

	_handleTeamChange (team: string) {
		this.setState({ teamValue: team });
	}

	_handleFirstName (firstname: string) {
		this.setState({ firstNameValue: firstname });
	}

	_handleSurname (surname: string) {
		this.setState({ surnameValue: surname });
	}

	_handlePrice (price: string) {
		this.setState({ priceValue: price });
	}

	_onValidate () {
		if (
			!validPlayerFirstName(this.state.firstNameValue) ||
      !validPlayerSurname(this.state.surnameValue)
		) {
			this.setState({ errorMessage: 'Invalid First name or Surname' });
			this.setState({ playerCreated: false });
			setTimeout(this._removeErrorMessage, 10000);
		} else {
			if (this.state.priceValue === '' || isNaN(parseFloat(this.state.priceValue))) {
				this.setState({ errorMessage: 'Please enter a valid price' });
				this.setState({ playerCreated: false });
				setTimeout(this._removeErrorMessage, 10000);
			} else {
				this._onSubmit();
			}
		}
	}

	_onSubmit () {
		let position: string = this.state.positionValue.toUpperCase();

		let data: CreatePlayer = {
			position: position,
			collegeTeam: this.state.teamValue,
			price: parseFloat(this.state.priceValue),
			firstName: this.state.firstNameValue,
			surname: this.state.surnameValue
		};
		createPlayer(data)
			.then(response => {
				this.setState({ playerCreated: true });
				let values: string[] = [
					this.state.firstNameValue,
					this.state.surnameValue,
					this.state.teamValue,
					this.state.priceValue,
					this.state.positionValue
				];
				this.setState({ previousValues: values });
				this.setState({ errorMessage: '' });
				setTimeout(this._removeErrorMessage, 10000);
			})
			.catch(error => {
				this.setState({ errorMessage: error });
				this.setState({ playerCreated: false });
				setTimeout(this._removeErrorMessage, 10000);
			});
	}

	render () {
		let positionChange = this._handlePositionChange;
		let teamChange = this._handleTeamChange;

		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<TextInputForm
						currentValue={this.state.firstNameValue}
						setValue={this._handleFirstName}
						title="First name"
					/>
					<TextInputForm
						currentValue={this.state.surnameValue}
						setValue={this._handleSurname}
						title="Surname"
					/>
					<CustomDropdown
						setData={positionChange}
						title="Position"
						values={['Goalkeeper', 'Defender', 'Midfielder', 'Attacker']}
					/>
				</div>
				<div className="admin-form-row-two">
					<TextInputForm
						currentValue={this.state.priceValue}
						setValue={this._handlePrice}
						title="Price"
					/>
					<CollegeTeam setTeam={teamChange} />
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnCreatePlayer"
							onClick={() => this._onValidate()}
						>
              Create Player
						</Button>
					</div>
				</div>
				{this.state.playerCreated ? (
					<div className="error-message-animation">
            Player {this.state.previousValues[0]} {this.state.previousValues[1]} successfully
            created for team {this.state.previousValues[2]} with price{' '}
						{this.state.previousValues[3]} with position {this.state.previousValues[4]}
					</div>
				) : null}

				{this.state.errorMessage.length > 0 ? (
					<div className="error-message-animation">Error : {this.state.errorMessage}</div>
				) : null}
			</div>
		);
	}
}
export default CreatePlayerForm;
