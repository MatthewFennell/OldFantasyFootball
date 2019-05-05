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
import ResponseMessage from '../common/ResponseMessage';

import TextInputForm from '../common/TexInputForm';

interface CreatePlayerProps {
  allCollegeTeams: CT[];
  collegeTeamName: string;
}

interface CreatePlayerState {
  positionValue: string;
  teamValue: string;
  firstNameValue: string;
  surnameValue: string;
  priceValue: string;
  previousValues: string[];

  responseMessage: string;
  isError: boolean;
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
		this.determineResponseMessage = this.determineResponseMessage.bind(this);

		const collegeName = this.props.allCollegeTeams.length > 0 ? this.props.allCollegeTeams[0].name : '';

		this.state = {
			positionValue: 'Goalkeeper',
			teamValue: this.props.collegeTeamName === '' ? collegeName : this.props.collegeTeamName,
			firstNameValue: '',
			surnameValue: '',
			priceValue: '',
			previousValues: [],
			responseMessage: '',
			isError: false
		};
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
			this.setState({ responseMessage: 'Invalid First name or Surname', isError: true });
		} else {
			if (priceValue === '' || isNaN(parseFloat(priceValue))) {
				this.setState({ responseMessage: 'Please enter a valid price', isError: true });
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
				let values: string[] = [
					firstNameValue,
					surnameValue,
					teamValue,
					priceValue,
					positionValue
				];
				this.setState({ previousValues: values, isError: false });
			})
			.catch(error => {
				this.setState({ responseMessage: error, isError: true });
				this.setState({ previousValues: [] });
			});
	}

	determineResponseMessage (error: string) {
		const { previousValues } = this.state;

		if (previousValues.length === 0) {
			return error;
		}

		return 'Player ' + previousValues[0] + ' ' + previousValues[1] +
			' successfully created for team ' + previousValues[2] + ' with price ' +
			previousValues[3] + ' with position ' + previousValues[4];
	}

	render () {
		const { firstNameValue, surnameValue, priceValue } = this.state;
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
					{this.props.collegeTeamName === '' ? <div className="admin-wrapper">
						<CollegeTeam setTeam={this._handleTeamChange} />
					</div> : null}
					<div>
						<Button
							className="btn btn-default btn-round-lg btn-lg second"
							id="btnCreatePlayer"
							onClick={this.handleValidate}
						>
              				Create Player
						</Button>
						<ResponseMessage
							isError={this.state.isError}
							responseMessage={this.determineResponseMessage(this.state.responseMessage)}
							shouldDisplay={this.determineResponseMessage.length > 0}
						/>
					</div>
				</div>
			</div>
		);
	}
}
export default CreatePlayerForm;
