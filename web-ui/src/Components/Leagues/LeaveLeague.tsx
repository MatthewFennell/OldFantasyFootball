import * as React from 'react';
import { Form, FormGroup, Label, Button } from 'reactstrap';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { RoutedFormProps } from '../../Models/Types/RoutedFormProps';
import { leaveLeague } from '../../Services/League/LeagueService';
import '../../Style/League/League-join.css';
import { Col } from 'react-bootstrap';
import ResponseMessage from '../common/ResponseMessage';
import * as lodash from 'lodash/fp';

interface LeaveLeagueState {
  leagueToLeave: string;
  error: string;
  isError: boolean;
  responseMessage: string;
}

interface LeaveLeagueProps {
	setLeagues: (user: string, leagueName: string, position: number) => void;
    userBeingViewed: string;
    leagues: { user: { league: { leagueName: string; position: number } } }
    removeLeagues: (user: string, leagueName: string) => void;
}

class LeaveLeague extends React.Component<
	RoutedFormProps<RouteComponentProps> & LeaveLeagueProps,
	LeaveLeagueState
	> {
	constructor (props: RoutedFormProps<RouteComponentProps> & LeaveLeagueProps) {
		super(props);
		this.state = {
			leagueToLeave: '',
			error: '',
			isError: false,
			responseMessage: ''
		};
		this._onSubmit = this._onSubmit.bind(this);

		let x = this.props.leagues;
		console.log('x = ' + JSON.stringify(x));
		let y = lodash.unset('cd442cf9-23f3-4a81-90aa-54f4c4dba5b4.ap', x);
		console.log('removed = ' + JSON.stringify(y));
	}

	_handleInput (eventName: any, eventTarget: HTMLInputElement) {
		this.setState({
			[eventName]: eventTarget.value
		} as Pick<LeaveLeagueState, keyof LeaveLeagueState>);
	}

  _validate = () => {
  	return false;
  };

  _onSubmit = (event: string) => {
  	switch (event) {
  	case 'btnJoinLeague':
  		const err = this._validate();
  		if (!err) {
  			leaveLeague(this.state.leagueToLeave)
  				.then(response => {
  					// TO:DO -> Remove league
  					this.props.removeLeagues(this.props.userBeingViewed, this.state.leagueToLeave);
					  this.setState({ responseMessage: 'Left league successfully', isError: false });
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
            Leave a league!
  				</h1>
  				<div id="login-input-fields">
  					<Label className="error-text">{error}</Label>
  					<FormGroup>
  						<Label
  							className="unselectable"
  							for="leagueToLeave"
  						>
                		Name of league to leave
  						</Label>
  						<Field
  							component="input"
  							id="leagueToLeave"
  							name="leagueToLeave"
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
            		Leave League
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
	})(LeaveLeague)
);
