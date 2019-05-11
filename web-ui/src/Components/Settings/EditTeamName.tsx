/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { patchTeamName } from '../../Services/User/UserService';
import '../../Style/League/League-join.css';
import { Col } from 'react-bootstrap';
import ResponseMessage from '../common/ResponseMessage';

interface EditTeamNameState {
  newTeamName: string;
  isError: boolean;
  responseMessage: string;
}

interface EditTeamNameProps {
}

class EditTeamName extends React.Component<
	RoutedFormProps<RouteComponentProps> & EditTeamNameProps,
	EditTeamNameState
	> {
	constructor (props: RoutedFormProps<RouteComponentProps> & EditTeamNameProps) {
		super(props);
		this.state = {
			newTeamName: '',
			isError: false,
			responseMessage: ''
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleInput (eventName: any, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<EditTeamNameState, keyof EditTeamNameState>);
	}

  _validate = () => {
  	return false;
  };

  _onSubmit = (event: string) => {
  	switch (event) {
  	case 'btnJoinLeague':
  		const err = this._validate();
  		if (!err) {
  			patchTeamName(this.state.newTeamName).then(() => {
  				this.setState(prevState => ({
  					responseMessage: 'Team name succesfully updated to ' + prevState.newTeamName, isError: false }));
  			})
  				.catch(error => {
  					this.setState({ responseMessage: error, isError: true });
  				});
  		}
  		break;
  	default:
  		break;
  	}
  };

  render () {
  	return (
  		<Col
  			className="league-info-screen"
  			lg={6}
  			md={6}
  			xs={6}
  		>
  		<div
  			className="join-league-form"
  			onSubmit={(e:any) => e.preventDefault()}
  		>
  			<Form id="join-league-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Change your team name
  				</h1>
  				<div id="login-input-fields">
  					<FormGroup>
  						<Field
  							component="input"
  							id="newTeamName"
  							name="newTeamName"
  							onChange={(e:any) => this._handleInput(e!.target.name, e!.target)}
  							type="text"
  						/>
  					</FormGroup>
  				</div>
  				<Button
  					className="btn btn-default btn-round-lg btn-lg first"
  					id="btnJoinLeague"
  					onClick={(e: any) => this._onSubmit(e.target.id)}
  					type="submit"
  				>
            		Submit
  				</Button>
				  <div className="join-league-response-wrapper">
				  <ResponseMessage
  						isError={this.state.isError}
  						responseMessage={this.state.responseMessage}
  						shouldDisplay={this.state.responseMessage.length > 0}
				  />
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
	})(EditTeamName)
);
