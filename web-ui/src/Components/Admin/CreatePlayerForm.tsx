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
		this.handleValidate = this.handleValidate.bind(this);
		this._removeErrorMessage = this._removeErrorMessage.bind(this);

		const { allCollegeTeams } = this.props;

		if (allCollegeTeams.length > 0) {
			this.state = {
				positionValue: 'Goalkeeper',
				teamValue: allCollegeTeams[0].name,
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

	handleValidate () {
		const { firstNameValue, surnameValue, priceValue } = this.state;
		if (
			!validPlayerFirstName(firstNameValue) ||
      !validPlayerSurname(surnameValue)
		) {
			this.setState({ errorMessage: 'Invalid First name or Surname' });
			this.setState({ playerCreated: false });
			setTimeout(this._removeErrorMessage, 10000);
		} else {
			if (priceValue === '' || isNaN(parseFloat(priceValue))) {
				this.setState({ errorMessage: 'Please enter a valid price' });
				this.setState({ playerCreated: false });
				setTimeout(this._removeErrorMessage, 10000);
			} else {
				this._onSubmit();
			}
		}
	}

	_onSubmit () {
		const { positionValue, teamValue, priceValue, firstNameValue, surnameValue } = this.state;
		let position: string = positionValue.toUpperCase();

		let data: CreatePlayer = {
			position: position,
			collegeTeam: teamValue,
			price: parseFloat(priceValue),
			firstName: firstNameValue,
			surname: surnameValue
		};
		createPlayer(data)
			.then(response => {
				this.setState({ playerCreated: true });
				let values: string[] = [
					firstNameValue,
					surnameValue,
					teamValue,
					priceValue,
					positionValue
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
		const { firstNameValue, surnameValue, priceValue, playerCreated, previousValues, errorMessage } = this.state;
		return (
			<div className="admin-form">
				<div className="admin-form-row-one">
					<div className="admin-wrapper">
						<TextInputForm
							currentValue={firstNameValue}
							setValue={this._handleFirstName}
							title="First name"
						/>
					</div>
					<div className="admin-wrapper">
						<TextInputForm
							currentValue={surnameValue}
							setValue={this._handleSurname}
							title="Surname"
						/>
					</div>
					<div className="admin-wrapper">
						<CustomDropdown
							setData={this._handlePositionChange}
							title="Position"
							values={['Goalkeeper', 'Defender', 'Midfielder', 'Attacker']}
						/>
					</div>
				</div>
				<div className="admin-form-row-two">
					<div className="admin-wrapper">
						<TextInputForm
							currentValue={priceValue}
							setValue={this._handlePrice}
							title="Price"
						/>
					</div>
					<div className="admin-wrapper">
						<CollegeTeam setTeam={this._handleTeamChange} />
					</div>
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnCreatePlayer"
							onClick={this.handleValidate}
						>
              Create Player
						</Button>
					</div>
				</div>
				{playerCreated ? (
					<div className="error-message-animation">
            Player {previousValues[0]} {previousValues[1]} successfully
            created for team {previousValues[2]} with price{' '}
						{previousValues[3]} with position {previousValues[4]}
					</div>
				) : null}

				{errorMessage.length > 0 ? (
					<div className="error-message-animation">Error : {errorMessage}</div>
				) : null}
			</div>
		);
	}
}
export default CreatePlayerForm;
