import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { joinLeague } from '../../Services/League/LeagueService';
import '../../Style/League/League-join.css';
import { Col } from 'react-bootstrap';
import ResponseMessage from '../common/ResponseMessage';

interface JoinLeagueState {
  codeToJoin: string;
  error: string;
  isError: boolean;
  responseMessage: string;
}

interface JoinLeagueProps {
	setLeagues: (user: string, leagueName: string, position: number) => void;
	userBeingViewed: string;
}

class JoinLeague extends React.Component<
	RoutedFormProps<RouteComponentProps> & JoinLeagueProps,
	JoinLeagueState
	> {
	constructor (props: RoutedFormProps<RouteComponentProps> & JoinLeagueProps) {
		super(props);
		this.state = {
			codeToJoin: '',
			error: '',
			isError: false,
			responseMessage: ''
		};
		this._onSubmit = this._onSubmit.bind(this);
	}

	_handleInput (eventName: any, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<JoinLeagueState, keyof JoinLeagueState>);
	}

  _validate = () => {
  	return false;
  };

  _onSubmit = (event: string) => {
	  const { codeToJoin } = this.state;
  	switch (event) {
  	case 'btnJoinLeague':
  		const err = this._validate();
  		if (!err) {
  			joinLeague(codeToJoin)
  				.then(response => {
					  this.props.setLeagues(this.props.userBeingViewed, response.leagueName, response.position);
					  this.setState({ responseMessage: 'Joined league ' + response.leagueName + ' successfully', isError: false });
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
	  const { error } = this.state;
  	return (
  		<Col
  			className="league-info-screen"
  			lg={6}
  			md={6}
  			xs={6}
  		>
  		<div
  			className="join-league-form"
  			onSubmit={e => e.preventDefault()}
  		>
  			<Form id="join-league-form">
  				<h1
  					className="text-center unselectable"
  					id="greeting"
  				>
            Join a league!
  				</h1>
  				<div id="login-input-fields">
  					<Label className="error-text">{error}</Label>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="codeToJoin"
  						>
                		Code to join league
  						</Label>
  						<Field
  							component="input"
  							id="codeToJoin"
  							name="codeToJoin"
  							onChange={e => this._handleInput(e!.target.name, e!.target)}
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
            		Join League
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
	})(JoinLeague)
);
