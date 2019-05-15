/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { createPlayer } from '../../Services/Player/PlayerService';
import { CreatePlayer } from '../../Models/Interfaces/CreatePlayer';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import '../../Style/League/League-create.css';
import { validPlayerFirstName, validPlayerSurname } from '../../Services/CredentialInputService';
import { Col } from 'react-bootstrap';
import CustomDropdown from '../common/CustomDropdown';
import ResponseMessage from '../common/ResponseMessage';
import LoadingSpinner from '../common/LoadingSpinner';

interface CreatePlayerState {
    positionValue: string;
    teamValue: string;
    firstNameValue: string;
    surnameValue: string;
    priceValue: string;
    previousValues: string[];
    responseMessage: string;
		isError: boolean;
		isLoading: boolean;
}

interface CreatePlayerProps {
    collegeTeam: string;
}

class CreateLeagueClass extends React.Component<
	RoutedFormProps<RouteComponentProps> & CreatePlayerProps,
	CreatePlayerState
	> {
	constructor (props: RoutedFormProps<RouteComponentProps> & CreatePlayerProps) {
		super(props);
		this.state = {
			positionValue: 'Goalkeeper',
			teamValue: this.props.collegeTeam,
			firstNameValue: '',
			surnameValue: '',
			priceValue: '',
			previousValues: [],
			responseMessage: '',
			isError: false,
			isLoading: false
		};
		this._onSubmit = this._onSubmit.bind(this);
		this._handlePositionChange = this._handlePositionChange.bind(this);
		this.determineResponseMessage = this.determineResponseMessage.bind(this);
	}

	_handleInput (eventName: any, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<CreatePlayerState, keyof CreatePlayerState>);
	}

	_validate (): boolean {
		const { firstNameValue, surnameValue, priceValue } = this.state;
		if (
			!validPlayerFirstName(firstNameValue) ||
      !validPlayerSurname(surnameValue)
		) {
			this.setState({ responseMessage: 'Invalid First name or Surname', isError: true });
			return false;
		} else {
			if (priceValue === '' || isNaN(parseFloat(priceValue))) {
				this.setState({ responseMessage: 'Please enter a valid price', isError: true });
				return false;
			} else {
				return true;
			}
		}
	}

	_handlePositionChange (position: string) {
		this.setState({ positionValue: position });
	}

  _onSubmit = (event: string) => {
  	switch (event) {
  	case 'btnCreateLeague':
  		const valid = this._validate();
  		if (valid) {
  			const { positionValue, teamValue, priceValue, firstNameValue, surnameValue } = this.state;
  			let position: string = positionValue.toUpperCase();
  			let data: CreatePlayer = {
  				position: position,
  				collegeTeam: teamValue,
  				price: parseFloat(priceValue),
  				firstName: firstNameValue,
  				surname: surnameValue
  			};
  			this.setState({ isLoading: true });
  			createPlayer(data)
  				.then(response => {
  					let values: string[] = [
  						firstNameValue,
  						surnameValue,
  						teamValue,
  						priceValue,
  						positionValue
  					];
  					this.setState({ previousValues: values, isError: false, isLoading: false });
  				})
  				.catch(error => {
  					this.setState({ responseMessage: error, isError: true, isLoading: false, previousValues: [] });
  				});
  		}
  		break;
  	default:
  		break;
  	}
  };

  determineResponseMessage (error: string) {
  	const { previousValues } = this.state;

  	if (previousValues.length === 0) {
  		return error;
  	}

  	return 'Player ' + previousValues[0] + ' ' + previousValues[1] +
			' successfully created for team ' + previousValues[2] + ' with price ' +
			previousValues[3] + ' and position ' + previousValues[4];
  }

  render () {
  	return (
  		<Col
  			className="league-info-screen"
  			lg={6}
  			md={6}
  			xs={6}
  		>
  		<div
  			className="create-league-form"
  			onSubmit={(e:any) => e.preventDefault()}
  		>
  			<Form id="create-league-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Create player
  				</h1>
  				<div id="login-input-fields">
  					<FormGroup>
  							<CustomDropdown
  								setData={this._handlePositionChange}
  								title="Position"
  								values={['Goalkeeper', 'Defender', 'Midfielder', 'Attacker']}
  							/>
  						<Label
  							className="unselectable"
  								for="firstNameValue"
  								id="firstNameValueLabel"
  						>
                		First name
  						</Label>
  						<Field
  							component="input"
  							id="firstNameValue"
  							name="firstNameValue"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>

  							<Label
							  className="unselectable"
  							for="surnameValue"
  							id="surnameValueLabel"
  							>
                		Surname
  						</Label>
  						<Field
  							component="input"
  							id="surnameValue"
  							name="surnameValue"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  							<Label
							  className="unselectable"
  							for="priceValue"
  							id="priceValueLabel"
  							>
                		Price
  						</Label>
  						<Field
  							component="input"
  							id="priceValue"
  							name="priceValue"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>

  					</FormGroup>
  				</div>
  				<Button
  					className="btn btn-default btn-round-lg btn-lg first"
  					id="btnCreateLeague"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  					type="submit"
  				>
            Create Player
  				</Button>
				  <div className="create-league-response-wrapper">
  						<ResponseMessage
  							isError={this.state.isError}
  							responseMessage={this.determineResponseMessage(this.state.responseMessage)}
  							shouldDisplay={this.determineResponseMessage.length > 0}
  						/>
  						<LoadingSpinner isLoading={this.state.isLoading} />
					  </div>
  			</Form>
  		</div>
		  </Col>
  	);
  }
}

export default withRouter(
	reduxForm<{}, any>({
		form: 'login'
	})(CreateLeagueClass)
);
